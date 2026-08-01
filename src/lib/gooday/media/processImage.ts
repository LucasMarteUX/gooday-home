import { MediaError } from './errors';
import type { MediaCaptureMode, ProcessImageOptions, ProcessedMedia } from './types';
import { uniqueImageName, validateImageFile } from './validateImage';

const POST_MAX_SIDE = 1920;
const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new MediaError('PROCESS_FAILED', 'Não foi possível processar a imagem.'));
    img.src = src;
  });
}

function canvasToJpegFile(canvas: HTMLCanvasElement, quality: number, name: string): Promise<File> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new MediaError('PROCESS_FAILED', 'Não foi possível processar a imagem.'));
          return;
        }
        resolve(new File([blob], name, { type: 'image/jpeg' }));
      },
      'image/jpeg',
      quality,
    );
  });
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  targetW: number,
  targetH: number,
) {
  const scale = Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight);
  const drawW = img.naturalWidth * scale;
  const drawH = img.naturalHeight * scale;
  const dx = (targetW - drawW) / 2;
  const dy = (targetH - drawH) / 2;
  ctx.drawImage(img, dx, dy, drawW, drawH);
}

function drawContainMax(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  maxSide: number,
): { width: number; height: number } {
  const longest = Math.max(img.naturalWidth, img.naturalHeight);
  const scale = longest > maxSide ? maxSide / longest : 1;
  const width = Math.max(1, Math.round(img.naturalWidth * scale));
  const height = Math.max(1, Math.round(img.naturalHeight * scale));
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  return { width, height };
}

/**
 * Valida e processa a imagem com Canvas API.
 * Posts: redimensiona o maior lado até 1920px.
 * Stories: recorte cover central 9:16 em 1080×1920.
 */
export async function processImage(
  input: File | Blob,
  options: ProcessImageOptions,
): Promise<ProcessedMedia> {
  const fileName = input instanceof File ? input.name : 'imagem.jpg';
  validateImageFile(input, fileName);

  const objectUrl = URL.createObjectURL(input);
  try {
    const img = await loadImage(objectUrl);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new MediaError('PROCESS_FAILED', 'Não foi possível processar a imagem.');
    }

    const quality = options.quality ?? (options.mode === 'story' ? 0.86 : 0.88);
    let width: number;
    let height: number;

    if (options.mode === 'story') {
      canvas.width = STORY_WIDTH;
      canvas.height = STORY_HEIGHT;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);
      drawCover(ctx, img, STORY_WIDTH, STORY_HEIGHT);
      width = STORY_WIDTH;
      height = STORY_HEIGHT;
    } else {
      ({ width, height } = drawContainMax(ctx, img, POST_MAX_SIDE));
    }

    const file = await canvasToJpegFile(canvas, quality, uniqueImageName('image/jpeg'));
    const previewUrl = URL.createObjectURL(file);

    return { file, previewUrl, width, height };
  } catch (error) {
    if (error instanceof MediaError) throw error;
    throw new MediaError('PROCESS_FAILED', 'Não foi possível processar a imagem.');
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function revokePreviewUrl(url: string | null | undefined) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

export function defaultProcessMode(mode: MediaCaptureMode): ProcessImageOptions {
  return { mode };
}
