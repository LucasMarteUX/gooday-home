import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? '';
  return { url, anonKey, configured: Boolean(url && anonKey) };
}

/** Cliente browser (somente chave pública). Retorna null se não houver env. */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  const { url, anonKey, configured } = getSupabaseEnv();
  if (!configured) return null;

  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return client;
}
