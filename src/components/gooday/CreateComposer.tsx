'use client';

import type { ChangeEvent } from 'react';

export type CreateComposerProps = {
  mode: 'post' | 'story';
  draft: string;
  onDraft: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  media: string;
  audience: string;
  location: string;
  group: string;
  taggedLabel: string;
  meAv: string;
  isPublishing?: boolean;
  pickMedia: () => void;
  clearMedia: () => void;
  tagPeople: () => void;
  addLocation: () => void;
  setAudience: () => void;
  pickGroup: () => void;
  publishPost: () => void;
  publishStory: () => void;
};

type PickerProps = {
  onPost: () => void;
  onStory: () => void;
};

function IconGrid() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.2-3 3.5-4.5 7-4.5s5.8 1.5 7 4.5" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}

export function CreatePicker({ onPost, onStory }: PickerProps) {
  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={onPost}
        className="flex items-center gap-4 rounded-2xl border border-gd-border bg-gd-surface px-4 py-4 text-left transition-colors hover:bg-gd-hover"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gd-brand/15 text-gd-brand-light">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="4" y="4" width="16" height="16" rx="3" />
            <circle cx="12" cy="12" r="3.2" />
            <path d="M16 8h.01" />
          </svg>
        </span>
        <span>
          <span className="block text-[15px] font-semibold">Publicação</span>
          <span className="mt-0.5 block text-[13px] text-gd-text-muted">Compartilhe fotos ou texto no feed</span>
        </span>
      </button>
      <button
        type="button"
        onClick={onStory}
        className="flex items-center gap-4 rounded-2xl border border-gd-border bg-gd-surface px-4 py-4 text-left transition-colors hover:bg-gd-hover"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gd-accent/15 text-gd-accent">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </span>
        <span>
          <span className="block text-[15px] font-semibold">Story</span>
          <span className="mt-0.5 block text-[13px] text-gd-text-muted">Desaparece em 24 horas</span>
        </span>
      </button>
    </div>
  );
}

export function CreateComposer(props: CreateComposerProps) {
  const isStory = props.mode === 'story';
  const canPublish = !props.isPublishing && (props.draft.trim().length > 0 || !!props.media);

  return (
    <div className="flex flex-col gap-4">
      {isStory ? (
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl bg-gd-elevated">
          {props.media ? (
            <>
              <button type="button" onClick={props.pickMedia} className="h-full w-full" aria-label="Trocar foto do story">
                <img src={props.media} alt="" className="h-full w-full object-cover" />
              </button>
              <button
                type="button"
                onClick={props.clearMedia}
                aria-label="Remover foto"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur"
              >
                ✕
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={props.pickMedia}
              className="flex h-full w-full flex-col items-center justify-center gap-2 text-gd-text-muted"
            >
              <IconGrid />
              <span className="text-sm font-medium">Tirar foto ou galeria</span>
            </button>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
            <input
              value={props.draft}
              onChange={props.onDraft}
              placeholder="Escreva uma legenda..."
              className="pointer-events-auto w-full border-none bg-transparent text-[15px] text-white outline-none placeholder:text-white/55"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            <button
              type="button"
              onClick={props.pickMedia}
              className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gd-elevated"
              aria-label={props.media ? 'Trocar foto' : 'Adicionar foto'}
            >
              {props.media ? (
                <img src={props.media} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full flex-col items-center justify-center gap-2 text-gd-text-muted">
                  <IconGrid />
                  <span className="text-sm font-medium">Tirar foto ou galeria</span>
                </span>
              )}
            </button>
            {props.media ? (
              <button
                type="button"
                onClick={props.clearMedia}
                aria-label="Remover foto"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur"
              >
                ✕
              </button>
            ) : null}
          </div>
          <div className="flex gap-3">
            <img src={props.meAv} alt="" className="h-10 w-10 flex-none rounded-full object-cover" />
            <textarea
              value={props.draft}
              onChange={props.onDraft}
              autoFocus
              rows={3}
              placeholder="Escreva uma legenda..."
              className="min-h-[72px] flex-1 resize-none border-none bg-transparent text-[15px] leading-relaxed text-gd-text outline-none placeholder:text-gd-text-subtle"
            />
          </div>
        </>
      )}

      {!isStory ? (
        <div className="flex flex-col divide-y divide-gd-elevated rounded-2xl border border-gd-border bg-gd-surface">
          <ToolbarRow icon={<IconUser />} label="Marcar pessoas" value={props.taggedLabel} onClick={props.tagPeople} />
          <ToolbarRow icon={<IconPin />} label="Adicionar local" value={props.location || 'Adicionar'} onClick={props.addLocation} />
          <ToolbarRow icon={<IconGlobe />} label="Público" value={props.audience} onClick={props.setAudience} />
          <ToolbarRow icon={<IconGrid />} label="Grupo" value={props.group || 'Nenhum'} onClick={props.pickGroup} />
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 border-t border-gd-elevated pt-3">
        <span className="text-[13px] text-gd-text-subtle">{props.draft.length}/2.200</span>
        <button
          type="button"
          onClick={isStory ? props.publishStory : props.publishPost}
          disabled={!canPublish}
          className="h-11 min-w-[140px] rounded-xl bg-gd-brand px-6 text-[14px] font-semibold text-white disabled:opacity-40"
        >
          {props.isPublishing ? 'Publicando…' : isStory ? 'Compartilhar no story' : 'Compartilhar'}
        </button>
      </div>
    </div>
  );
}

function ToolbarRow({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
      <span className="text-gd-text-secondary">{icon}</span>
      <span className="flex-1 text-[14px] font-medium">{label}</span>
      <span className="max-w-[120px] truncate text-[13px] text-gd-text-muted">{value}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gd-text-subtle">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}
