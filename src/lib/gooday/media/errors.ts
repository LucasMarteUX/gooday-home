export class MediaError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'MediaError';
    this.code = code;
  }
}

export function cameraErrorMessage(error: unknown): string {
  if (error instanceof MediaError) return error.message;

  const name =
    error && typeof error === 'object' && 'name' in error
      ? String((error as { name: string }).name)
      : '';

  switch (name) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
      return 'Verifique se a permissão da câmera está liberada no navegador.';
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return 'Nenhuma câmera foi encontrada neste dispositivo.';
    case 'NotReadableError':
    case 'TrackStartError':
      return 'A câmera está sendo usada por outro aplicativo. Feche-o e tente novamente.';
    case 'OverconstrainedError':
      return 'Não foi possível configurar a câmera neste dispositivo.';
    case 'SecurityError':
      return 'O acesso à câmera foi bloqueado por segurança do navegador.';
    default:
      return 'Não foi possível acessar sua câmera.';
  }
}

export function uploadErrorMessage(error: unknown): string {
  if (error instanceof MediaError) return error.message;
  return 'Não foi possível enviar sua imagem. Tente novamente.';
}
