'use client';

import { useCallback, useEffect, useRef } from 'react';

type DragScrollOptions = {
  /** Distância mínima (px) para considerar drag e cancelar o click nos filhos. */
  threshold?: number;
};

/**
 * Scroll horizontal por click-and-drag (desktop), sem atrapalhar o toque no mobile.
 */
export function useDragScroll<T extends HTMLElement>(options: DragScrollOptions = {}) {
  const { threshold = 6 } = options;
  const ref = useRef<T | null>(null);
  const state = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const onPointerDown = useCallback((e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    // Só mouse / pen — touch já tem scroll nativo
    if (e.pointerType === 'touch') return;

    state.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      pointerId: e.pointerId,
    };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    const el = ref.current;
    const s = state.current;
    if (!el || !s.active) return;

    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > threshold) s.moved = true;
    if (s.moved) {
      el.scrollLeft = s.scrollLeft - dx;
      e.preventDefault();
    }
  }, [threshold]);

  const endDrag = useCallback((e: PointerEvent) => {
    const el = ref.current;
    const s = state.current;
    if (!s.active) return;

    s.active = false;
    if (el) {
      try {
        el.releasePointerCapture(s.pointerId);
      } catch {
        /* ignore */
      }
      el.style.cursor = 'grab';
      el.style.removeProperty('user-select');
    }

    // Se arrastou, bloqueia o click no botão filho
    if (s.moved) {
      const blockClick = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      el?.addEventListener('click', blockClick, { capture: true, once: true });
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.cursor = 'grab';
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    el.addEventListener('lostpointercapture', endDrag);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', endDrag);
      el.removeEventListener('pointercancel', endDrag);
      el.removeEventListener('lostpointercapture', endDrag);
    };
  }, [onPointerDown, onPointerMove, endDrag]);

  return ref;
}
