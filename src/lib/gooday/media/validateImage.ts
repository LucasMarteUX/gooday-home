import { MediaError } from './errors';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
]);

/** Limite de upload bruto antes do processamento (15 MB). */
export const MAX_RAW_IMAGE_BYTES = 15 * 1024 * 1024;

export function validateImageFile(file: File | Blob, fileName = 'imagem'): void {
  const type = file.type || '';
  const looksLikeImage =
    ALLOWED_TYPES.has(type) || type.startsWith('image/') || /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(fileName);

  if (!looksLikeImage) {
    throw new MediaError('INVALID_TYPE', 'O arquivo selecionado não é uma imagem válida.');
  }

  if (file.size > MAX_RAW_IMAGE_BYTES) {
    throw new MediaError('FILE_TOO_LARGE', 'A imagem excede o tamanho máximo permitido.');
  }
}

export function extensionForMime(mime: string): string {
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  if (mime.includes('gif')) return 'gif';
  return 'jpg';
}

export function uniqueImageName(mime = 'image/jpeg'): string {
  return `camera-${crypto.randomUUID()}.${extensionForMime(mime)}`;
}
