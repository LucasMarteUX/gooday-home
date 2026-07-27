'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { EMOJI_CATEGORIES } from '@/lib/gooday/emojiData';

type Props = {
  onSelect: (emoji: string) => void;
  onClose: () => void;
  className?: string;
  /** Anchor panel: 'up' = above trigger (default), 'down' = below */
  placement?: 'up' | 'down';
};

export function EmojiPicker({ onSelect, onClose, className = '', placement = 'up' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [categoryId, setCategoryId] = useState(EMOJI_CATEGORIES[0].id);
  const [query, setQuery] = useState('');

  const category = EMOJI_CATEGORIES.find((c) => c.id === categoryId) ?? EMOJI_CATEGORIES[0];
  const filtered = query.trim()
    ? EMOJI_CATEGORIES.flatMap((c) => c.emojis).filter((e) => e.includes(query.trim()))
    : category.emojis;

  const handleOutside = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [handleOutside]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-label="Emojis"
      className={`absolute z-20 flex w-[min(320px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-gd-border bg-gd-surface shadow-[0_16px_48px_rgba(0,0,0,0.4)] ${
        placement === 'up' ? 'bottom-[calc(100%+8px)] right-0' : 'top-[calc(100%+8px)] right-0'
      } ${className}`}
      style={{ height: 320 }}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex h-10 flex-none items-center gap-2 border-b border-gd-border px-2.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B818C" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.2-3.2" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar emoji"
          aria-label="Buscar emoji"
          className="min-w-0 flex-1 border-none bg-transparent text-[13px] text-white outline-none placeholder:text-gd-text-subtle"
        />
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-8 gap-0.5">
          {filtered.map((emoji, i) => (
            <button
              key={`${emoji}-${i}`}
              type="button"
              onClick={() => onSelect(emoji)}
              className="grid h-9 w-full place-items-center rounded-lg text-[20px] leading-none transition-colors hover:bg-gd-elevated active:scale-95"
            >
              {emoji}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-[13px] text-gd-text-subtle">Nenhum emoji encontrado</p>
        ) : null}
      </div>

      {!query.trim() ? (
        <div className="no-scrollbar flex flex-none gap-0.5 overflow-x-auto border-t border-gd-border px-1.5 py-1.5">
          {EMOJI_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryId(c.id)}
              aria-label={c.label}
              title={c.label}
              className={`grid h-9 w-9 flex-none place-items-center rounded-lg text-[18px] ${
                categoryId === c.id ? 'bg-gd-elevated' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {c.icon}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
