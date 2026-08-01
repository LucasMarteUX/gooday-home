'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { GoodayHomeViewModel } from "@/lib/gooday/useGoodayHome";
import { EmojiPicker } from './EmojiPicker';

type Props = {
  vm: GoodayHomeViewModel;
};

type FloatingReaction = {
  id: number;
  emoji: string;
  x: number;
};

function ArrowIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'left' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}

export function StoryViewer({ vm }: Props) {
  const [floats, setFloats] = useState<FloatingReaction[]>([]);
  const floatIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFloats([]);
    vm.clearStoryReply?.();
  }, [vm.story?.img, vm.clearStoryReply]);

  if (!vm.story) return null;

  const spawnFloat = (emoji: string) => {
    const id = ++floatIdRef.current;
    const x = (Math.random() * 72) - 36;
    setFloats((prev) => [...prev, { id, emoji, x }]);
    window.setTimeout(() => {
      setFloats((prev) => prev.filter((f) => f.id !== id));
    }, 1500);
  };

  const react = (emoji: string) => {
    spawnFloat(emoji);
    vm.reactToStory(emoji);
  };

  const sendReply = () => {
    const text = vm.storyReplyDraft.trim();
    if (!text) return;
    spawnFloat('💬');
    vm.sendStoryReply();
  };

  const onReplyKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendReply();
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Story"
      aria-modal="true"
      className="fixed inset-0 z-[80] flex animate-[gd-fade_180ms_ease] items-center justify-center bg-black/85 p-3 backdrop-blur-sm min-[800px]:gap-4 min-[800px]:p-6"
      onClick={vm.closeStory}
    >
      <button
        type="button"
        aria-label="Story anterior"
        disabled={!vm.storyHasPrev}
        onClick={(e) => {
          e.stopPropagation();
          vm.storyPrev();
        }}
        className={`hidden h-11 w-11 flex-none place-items-center rounded-full transition-colors min-[800px]:grid ${
          vm.storyHasPrev
            ? 'bg-white/15 text-white hover:bg-white/25'
            : 'pointer-events-none bg-white/5 text-white/25'
        }`}
      >
        <ArrowIcon dir="left" />
      </button>

      <div
        className="relative aspect-[9/16] w-[min(420px,calc(100vw-24px),calc((100dvh-24px)*9/16))] max-h-[calc(100dvh-24px)] overflow-hidden rounded-[18px] bg-[#0a0d10] shadow-[0_24px_80px_rgba(0,0,0,0.55)] min-[800px]:w-[min(420px,calc(100vw-120px),calc((100dvh-48px)*9/16))] min-[800px]:max-h-[calc(100dvh-48px)] min-[800px]:rounded-[24px]"
        onClick={vm.stop}
      >
        <img
          src={vm.story.img}
          alt={vm.story.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 from-0% via-transparent via-[22%] to-black/75 to-100%" />

        <button
          type="button"
          aria-label="Story anterior"
          className="absolute bottom-0 left-0 top-0 z-[1] w-[30%]"
          onClick={vm.storyPrev}
        />
        <button
          type="button"
          aria-label="Próximo story"
          className="absolute bottom-0 right-0 top-0 z-[1] w-[70%]"
          onClick={vm.storyNext}
        />

        {vm.storyHasPrev ? (
          <button
            type="button"
            aria-label="Story anterior"
            onClick={vm.storyPrev}
            className="absolute left-2 top-1/2 z-[3] grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm min-[800px]:hidden"
          >
            <ArrowIcon dir="left" />
          </button>
        ) : null}
        {vm.storyHasNext ? (
          <button
            type="button"
            aria-label="Próximo story"
            onClick={vm.storyNext}
            className="absolute right-2 top-1/2 z-[3] grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm min-[800px]:hidden"
          >
            <ArrowIcon dir="right" />
          </button>
        ) : null}

        <div className="absolute left-0 right-0 top-0 z-[2] flex gap-[4px] px-3 pt-3">
          {vm.storyBars.map((b, i) => (
            <span key={i} className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-white/30">
              <span className="block h-full rounded-full bg-white" style={{ width: b.w }} />
            </span>
          ))}
        </div>

        <div className="absolute left-3 right-3 top-7 z-[2] flex items-center gap-2.5">
          <img
            src={vm.story.av}
            alt=""
            className="h-9 w-9 rounded-full border-2 border-white/80 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-[14px] font-semibold text-white">{vm.story.name}</p>
            <p className="mt-0.5 text-[11px] text-white/70">{vm.story.time}</p>
          </div>
          <button
            type="button"
            onClick={vm.closeStory}
            aria-label="Fechar story"
            className="grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Floating reactions */}
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-[4] h-56 overflow-visible">
          {floats.map((f) => (
            <span
              key={f.id}
              className="gd-story-float absolute bottom-0 left-1/2 text-[42px] drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
              style={{ ['--gd-float-x' as string]: `${f.x}px` }}
            >
              {f.emoji}
            </span>
          ))}
        </div>

        {/* Reply + reactions */}
        <div
          className="absolute bottom-3 left-3 right-3 z-[5] flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex h-11 min-w-0 flex-1 items-center gap-1 rounded-full border border-white/35 bg-black/35 py-0 pl-3.5 pr-1.5 backdrop-blur-sm">
            {vm.storyEmojiOpen ? (
              <EmojiPicker
                placement="up"
                className="!right-0 !left-auto"
                onSelect={(emoji) => {
                  vm.appendStoryEmoji(emoji);
                  inputRef.current?.focus();
                }}
                onClose={vm.closeStoryEmoji}
              />
            ) : null}
            <input
              ref={inputRef}
              value={vm.storyReplyDraft}
              onChange={vm.onStoryReply}
              onFocus={vm.pauseStory}
              onBlur={vm.resumeStory}
              onKeyDown={onReplyKey}
              placeholder="Responder..."
              aria-label="Responder story"
              className="min-w-0 flex-1 border-none bg-transparent text-[14px] text-white outline-none placeholder:text-white/55"
            />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={vm.toggleStoryEmoji}
              aria-label="Emoji"
              aria-expanded={vm.storyEmojiOpen}
              className={`grid h-8 w-8 flex-none place-items-center rounded-full text-[17px] ${
                vm.storyEmojiOpen ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              😊
            </button>
            {vm.storyReplyDraft.trim() ? (
              <button
                type="button"
                onClick={sendReply}
                aria-label="Enviar resposta"
                className="grid h-8 w-8 flex-none place-items-center rounded-full bg-gd-brand text-gd-on-brand"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12l16-8-6 16-3-6z" />
                </svg>
              </button>
            ) : null}
          </div>
          {vm.quickReactions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => react(q.emoji)}
              aria-label={`Reagir com ${q.emoji}`}
              className="grid h-10 w-10 flex-none place-items-center rounded-full bg-black/35 text-lg backdrop-blur-sm transition-transform active:scale-110"
            >
              {q.emoji}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Próximo story"
        disabled={!vm.storyHasNext}
        onClick={(e) => {
          e.stopPropagation();
          vm.storyNext();
        }}
        className={`hidden h-11 w-11 flex-none place-items-center rounded-full transition-colors min-[800px]:grid ${
          vm.storyHasNext
            ? 'bg-white/15 text-white hover:bg-white/25'
            : 'pointer-events-none bg-white/5 text-white/25'
        }`}
      >
        <ArrowIcon dir="right" />
      </button>
    </div>
  );
}
