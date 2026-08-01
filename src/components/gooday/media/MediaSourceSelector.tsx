'use client';

type Props = {
  mode: 'post' | 'story';
  cameraAvailable: boolean;
  onCamera: () => void;
  onGallery: () => void;
  onCancel: () => void;
};

export function MediaSourceSelector({ mode, cameraAvailable, onCamera, onGallery, onCancel }: Props) {
  const title = mode === 'story' ? 'Novo story' : 'Adicionar foto';
  const subtitle =
    mode === 'story'
      ? 'Escolha como quer criar seu story'
      : 'Tire uma foto ou escolha da galeria';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gd-media-source-title"
      className="w-full max-w-md animate-[gd-slide_240ms_cubic-bezier(0.2,0,0,1)] rounded-t-3xl border border-[color:var(--gd-hairline-strong)] bg-gd-card p-4 pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[var(--gd-shadow)] min-[800px]:rounded-3xl"
    >
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gd-border-strong min-[800px]:hidden" />
      <h2 id="gd-media-source-title" className="text-lg font-semibold tracking-[-0.01em]">
        {title}
      </h2>
      <p className="mt-1 text-[13px] text-gd-text-muted">{subtitle}</p>

      <div className="mt-4 grid gap-2">
        {cameraAvailable ? (
          <button
            type="button"
            onClick={onCamera}
            className="flex min-h-12 items-center gap-3 rounded-2xl border border-gd-border bg-gd-surface px-4 py-3.5 text-left transition-colors hover:bg-gd-hover"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gd-brand/15 text-gd-brand-light" aria-hidden>
              <CameraIcon />
            </span>
            <span>
              <span className="block text-[15px] font-semibold">Tirar foto</span>
              <span className="mt-0.5 block text-[13px] text-gd-text-muted">Usar a câmera do dispositivo</span>
            </span>
          </button>
        ) : null}

        <button
          type="button"
          onClick={onGallery}
          className="flex min-h-12 items-center gap-3 rounded-2xl border border-gd-border bg-gd-surface px-4 py-3.5 text-left transition-colors hover:bg-gd-hover"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gd-accent/15 text-gd-accent" aria-hidden>
            <GalleryIcon />
          </span>
          <span>
            <span className="block text-[15px] font-semibold">Escolher da galeria</span>
            <span className="mt-0.5 block text-[13px] text-gd-text-muted">Selecionar uma imagem salva</span>
          </span>
        </button>

        {!cameraAvailable ? (
          <p className="px-1 text-[12px] text-gd-text-subtle" role="status">
            A câmera personalizada não está disponível neste navegador. Você ainda pode escolher da galeria
            ou usar o seletor nativo com câmera.
          </p>
        ) : null}

        <button
          type="button"
          onClick={onCancel}
          className="mt-1 flex min-h-12 items-center justify-center rounded-2xl bg-gd-elevated text-[15px] font-semibold text-gd-text-secondary transition-colors hover:bg-gd-hover"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8.5A2.5 2.5 0 016.5 6h2l1.2-1.8A1.5 1.5 0 0111 3.5h2a1.5 1.5 0 011.3.7L15.5 6h2A2.5 2.5 0 0120 8.5v9A2.5 2.5 0 0117.5 20h-11A2.5 2.5 0 014 17.5v-9z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M3 16l5-4.5 4 3.5 3-2.5 6 5" />
    </svg>
  );
}
