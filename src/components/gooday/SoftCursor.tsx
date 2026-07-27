'use client';

import { useEffect, useRef, useState } from 'react';

/** Cursor circular suave — só em ponteiro fino (desktop). Nunca bloqueia cliques. */
export function SoftCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  const hoveringRef = useRef(false);
  const pressedRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add('gd-soft-cursor');

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(
        el.closest(
          'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="interactive"]',
        ),
      );
    };

    const paint = () => {
      const el = dotRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      const size = pressedRef.current ? 18 : hoveringRef.current ? 40 : 26;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      hoveringRef.current = isInteractive(e.target);
      const el = dotRef.current;
      if (el) el.style.opacity = '1';
    };

    const onLeave = () => {
      const el = dotRef.current;
      if (el) el.style.opacity = '0';
    };

    const onDown = (e: MouseEvent) => {
      // Snap no ponto real do clique — evita mirar o círculo atrasado
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      pressedRef.current = true;
      paint();
    };

    const onUp = () => {
      pressedRef.current = false;
      paint();
    };

    const tick = () => {
      const ease = pressedRef.current ? 1 : 0.42;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;
      paint();
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { capture: true, passive: true });
    window.addEventListener('mouseup', onUp, { capture: true, passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      root.classList.remove('gd-soft-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown, true);
      window.removeEventListener('mouseup', onUp, true);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="gd-cursor-dot"
      style={{ opacity: 0 }}
    />
  );
}
