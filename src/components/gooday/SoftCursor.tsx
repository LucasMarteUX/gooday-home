'use client';

import { useEffect, useState } from 'react';

/**
 * Ativa cursor circular via CSS nativo (data-URI).
 * Sem elemento DOM seguindo o mouse → clique sempre no ponto real.
 */
export function SoftCursor() {
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
    return () => root.classList.remove('gd-soft-cursor');
  }, [enabled]);

  return null;
}
