'use client';

type Props = {
  mode: 'post' | 'story';
  src: string;
  busy?: boolean;
  onRetake: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

export function ImagePreview({ mode, src, busy, onRetake, onConfirm, onClose }: Props) {
  const isStory = mode === 'story';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Revisar foto"
      className="fixed inset-0 z-[95] flex flex-col bg-black text-white"
    >
      <div className="flex items-center justify-between px-4 pb-2 pt-[calc(12px+env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar revisão"
          className="grid h-11 min-w-11 place-items-center rounded-full bg-white/10 text-sm font-semibold"
        >
          Fechar
        </button>
        <p className="text-sm font-medium text-white/80">Revisar foto</p>
        <span className="w-11" />
      </div>

      <div className="relative mx-auto flex w-full flex-1 items-center justify-center px-3">
        <div
          className={[
            'relative w-full overflow-hidden rounded-2xl bg-neutral-900',
            isStory ? 'aspect-[9/16] max-h-full max-w-[360px]' : 'aspect-square max-h-full max-w-[520px]',
          ].join(' ')}
        >
          <img src={src} alt="Pré-visualização da foto" className="h-full w-full object-cover" />
          {busy ? (
            <div className="absolute inset-0 grid place-items-center bg-black/50 text-sm" role="status">
              Processando imagem…
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-4">
        <button
          type="button"
          onClick={onRetake}
          disabled={busy}
          className="h-12 flex-1 rounded-2xl bg-white/10 text-[15px] font-semibold disabled:opacity-40"
        >
          Refazer
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={busy}
          className="h-12 flex-1 rounded-2xl bg-gd-brand text-[15px] font-semibold text-gd-on-brand disabled:opacity-40"
        >
          Usar foto
        </button>
      </div>
    </div>
  );
}
