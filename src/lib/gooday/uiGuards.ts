'use client';

import { useEffect } from 'react';

/**
 * Fecha ao clicar/tocar fora do elemento referenciado, ou ao pressionar Escape.
 * Útil para dropdowns e menus flutuantes.
 */
export function useClickOutside(
  open: boolean,
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void,
  /** Elementos que não devem disparar o close (ex.: botão que abre o menu) */
  ignoreRef?: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;

    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) return;
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (el.contains(target)) return;
      if (ignoreRef?.current?.contains(target)) return;
      onClose();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer, { passive: true });
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, ref, ignoreRef, onClose]);
}

/** Trava o scroll do body enquanto overlays estão abertos (cara de app). */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
    };

    style.overflow = 'hidden';
    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.width = '100%';

    return () => {
      style.overflow = prev.overflow;
      style.position = prev.position;
      style.top = prev.top;
      style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
