'use client';

import { useCallback, useEffect, useRef } from 'react';

type DragScrollOptions = {
  /** Distância mínima (px) para considerar drag e cancelar o click nos filhos. */
  threshold?: number;
};

/**
 * Scroll horizontal por click-and-drag (desktop).
 * Só captura o pointer depois de ultrapassar o threshold — clicks nos stories continuam funcionando.
 */
export function useDragScroll<T extends HTMLElement>(options: DragScrollOptions = {}) {
  const { threshold = 8 } = options;
  const ref = useRef<T | null>(null);
  const state = useRef({
    tracking: false,
    dragging: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const softCursor = () => document.documentElement.classList.contains('gd-soft-cursor');
    if (!softCursor()) el.style.cursor = 'grab';

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (e.button !== 0) return;

      state.current = {
        tracking: true,
        dragging: false,
        startX: e.clientX,
        scrollLeft: el.scrollLeft,
        pointerId: e.pointerId,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = state.current;
      if (!s.tracking) return;

      const dx = e.clientX - s.startX;

      if (!s.dragging) {
        if (Math.abs(dx) < threshold) return;
        s.dragging = true;
        try {
          el.setPointerCapture(s.pointerId);
        } catch {
          /* ignore */
        }
        if (!softCursor()) el.style.cursor = 'grabbing';
        el.style.userSelect = 'none';
      }

      el.scrollLeft = s.scrollLeft - dx;
      e.preventDefault();
    };

    const onPointerUp = () => {
      const s = state.current;
      if (!s.tracking) return;

      const wasDragging = s.dragging;
      s.tracking = false;
      s.dragging = false;

      try {
        if (el.hasPointerCapture(s.pointerId)) el.releasePointerCapture(s.pointerId);
      } catch {
        /* ignore */
      }

      if (!softCursor()) el.style.cursor = 'grab';
      el.style.removeProperty('user-select');

      if (wasDragging) {
        const blockClick = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        el.addEventListener('click', blockClick, { capture: true, once: true });
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [threshold]);

  return ref;
}
