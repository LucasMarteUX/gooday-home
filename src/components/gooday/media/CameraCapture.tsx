'use client';

import { useCamera } from '@/lib/gooday/media';
import type { MediaCaptureMode, MediaFacingMode } from '@/lib/gooday/media';

type Props = {
  mode: MediaCaptureMode;
  initialFacing?: MediaFacingMode;
  onCapture: (file: File) => void;
  onClose: () => void;
  onError: (message: string) => void;
};

export function CameraCapture({
  mode,
  initialFacing = 'environment',
  onCapture,
  onClose,
  onError,
}: Props) {
  const camera = useCamera({ initialFacing, enabled: true });
  const isStory = mode === 'story';

  const handleCapture = async () => {
    try {
      const file = await camera.capturePhoto();
      onCapture(file);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Não foi possível capturar a imagem.');
    }
  };

  const handleFlip = async () => {
    try {
      await camera.flipCamera();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Não foi possível trocar a câmera.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Câmera"
      className="fixed inset-0 z-[95] flex flex-col bg-black text-white"
    >
      <div
        className={[
          'relative mx-auto flex w-full flex-1 items-center justify-center overflow-hidden',
          isStory ? 'max-w-[480px]' : 'max-w-[720px]',
        ].join(' ')}
      >
        <div
          className={[
            'relative w-full overflow-hidden bg-black',
            isStory ? 'aspect-[9/16] max-h-full' : 'aspect-[4/5] max-h-full sm:aspect-video',
          ].join(' ')}
        >
          <video
            ref={camera.videoRef}
            autoPlay
            playsInline
            muted
            className={[
              'h-full w-full object-cover',
              camera.facing === 'user' ? 'scale-x-[-1]' : '',
            ].join(' ')}
          />

          {(camera.starting || !camera.ready) && !camera.error ? (
            <div className="absolute inset-0 grid place-items-center bg-black/50 text-sm text-white/80">
              Abrindo câmera…
            </div>
          ) : null}

          {camera.error ? (
            <div className="absolute inset-0 grid place-items-center bg-black/70 px-6 text-center">
              <p className="max-w-sm text-[15px] leading-relaxed text-white/90" role="alert">
                {camera.error}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-6 pb-[calc(20px+env(safe-area-inset-bottom))] pt-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar câmera"
          className="grid h-12 min-w-12 place-items-center rounded-full bg-white/10 text-sm font-semibold backdrop-blur"
        >
          Fechar
        </button>

        <button
          type="button"
          onClick={() => void handleCapture()}
          disabled={!camera.ready}
          aria-label="Capturar foto"
          className="grid h-[72px] w-[72px] place-items-center rounded-full border-4 border-white/80 bg-white disabled:opacity-40"
        >
          <span className="h-14 w-14 rounded-full bg-white ring-2 ring-black/20" />
        </button>

        <button
          type="button"
          onClick={() => void handleFlip()}
          disabled={!camera.ready}
          aria-label="Alternar câmera"
          className="grid h-12 min-w-12 place-items-center rounded-full bg-white/10 backdrop-blur disabled:opacity-40"
        >
          <FlipIcon />
        </button>
      </div>
    </div>
  );
}

function FlipIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h4v4" />
      <path d="M20 4l-5.5 5.5" />
      <path d="M8 20H4v-4" />
      <path d="M4 20l5.5-5.5" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}
