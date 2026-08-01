import { getSupabaseBrowserClient, getSupabaseEnv } from '@/lib/supabase/client';
import { MediaError, uploadErrorMessage } from './errors';
import type { UploadKind, UploadResult } from './types';
import { extensionForMime, uniqueImageName, validateImageFile } from './validateImage';

const BUCKETS: Record<UploadKind, string> = {
  post: 'post-images',
  story: 'story-images',
};

type UploadOptions = {
  file: File;
  kind: UploadKind;
  /** UUID do usuário autenticado; fallback local usa "local". */
  userId?: string | null;
  entityId?: string;
};

/**
 * Envia imagem ao Supabase Storage quando configurado + autenticado.
 * Caso contrário, mantém preview local (blob URL) para o fluxo mock atual.
 */
export async function uploadMedia(options: UploadOptions): Promise<UploadResult> {
  const { file, kind } = options;
  validateImageFile(file, file.name);

  const supabase = getSupabaseBrowserClient();
  const { configured } = getSupabaseEnv();

  // Sem Supabase ou sem sessão: o composer já tem preview blob — não duplicar URL.
  if (!configured || !supabase) {
    return {
      publicUrl: '',
      path: `local/${kind}/${uniqueImageName(file.type)}`,
      bucket: 'local',
    };
  }

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        publicUrl: '',
        path: `local/${kind}/${uniqueImageName(file.type)}`,
        bucket: 'local',
      };
    }

    const userId = options.userId || user.id;
    const entityId = options.entityId || crypto.randomUUID();
    const ext = extensionForMime(file.type || 'image/jpeg');
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const path = `${kind === 'post' ? 'posts' : 'stories'}/${userId}/${entityId}/${fileName}`;
    const bucket = BUCKETS[kind];

    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'image/jpeg',
    });

    if (uploadError) {
      throw new MediaError('UPLOAD_FAILED', uploadErrorMessage(uploadError));
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    if (!data?.publicUrl) {
      throw new MediaError('UPLOAD_FAILED', 'Não foi possível enviar sua imagem. Tente novamente.');
    }

    return { publicUrl: data.publicUrl, path, bucket };
  } catch (error) {
    if (error instanceof MediaError) throw error;
    throw new MediaError('UPLOAD_FAILED', uploadErrorMessage(error));
  }
}

/** Remove arquivo órfão do storage após falha ao gravar o registro. */
export async function removeUploadedMedia(bucket: string, path: string): Promise<void> {
  if (bucket === 'local' || path.startsWith('local/')) return;
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;
  await supabase.storage.from(bucket).remove([path]);
}
