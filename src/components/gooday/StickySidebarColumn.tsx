'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

const StickySidebarContext = createContext(false);

function getStickyTop() {
  if (typeof window === 'undefined') return 80;
  const value = getComputedStyle(document.documentElement).getPropertyValue('--gd-sticky-top').trim();
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 80;
}

type ColumnProps = {
  children: ReactNode;
  className?: string;
  alwaysActive?: boolean;
};

export function StickySidebarColumn({ children, className = '', alwaysActive = false }: ColumnProps) {
  const asideRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(alwaysActive);

  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;

    const check = () => {
      if (alwaysActive) {
        setStuck(true);
        return;
      }
      const stickyTop = getStickyTop();
      setStuck(el.getBoundingClientRect().top <= stickyTop + 1);
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [alwaysActive]);

  const active = stuck || alwaysActive;

  return (
    <StickySidebarContext.Provider value={active}>
      <aside
        ref={asideRef}
        className={`gooday-sidebar-sticky flex min-h-0 min-w-0 flex-col gap-3.5 ${active ? 'gooday-sidebar-sticky--active' : ''} ${className}`}
      >
        {children}
      </aside>
    </StickySidebarContext.Provider>
  );
}

type ScrollProps = {
  children: ReactNode;
  fadeColor?: string;
  className?: string;
  alwaysScrollable?: boolean;
};

export function StickySidebarScroll({
  children,
  fadeColor = 'var(--gd-bg)',
  className = '',
  alwaysScrollable = false,
}: ScrollProps) {
  const stuck = useContext(StickySidebarContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeTop, setFadeTop] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(false);
  const canScroll = stuck || alwaysScrollable;

  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setFadeTop(el.scrollTop > 2);
    setFadeBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateFades();
    el.addEventListener('scroll', updateFades, { passive: true });
    const ro = new ResizeObserver(updateFades);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateFades);
      ro.disconnect();
    };
  }, [canScroll, updateFades, children]);

  useEffect(() => {
    if (!canScroll) {
      scrollRef.current?.scrollTo({ top: 0 });
      setFadeTop(false);
      setFadeBottom(false);
    } else {
      updateFades();
    }
  }, [canScroll, updateFades]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !canScroll) return;

    const onWheelNative = (e: globalThis.WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Enquanto houver conteúdo interno para rolar, trava o scroll da página
      if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
        e.stopPropagation();
        return;
      }

      // No limite: não deixa o wheel “vazar” para a timeline
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener('wheel', onWheelNative, { passive: false });
    return () => el.removeEventListener('wheel', onWheelNative);
  }, [canScroll]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div
        ref={scrollRef}
        className={`no-scrollbar flex min-h-0 flex-col overscroll-contain ${canScroll ? 'flex-1 overflow-y-auto' : ''} ${className}`}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 transition-opacity duration-200"
        style={{
          opacity: canScroll && fadeTop ? 1 : 0,
          background: `linear-gradient(to bottom, ${fadeColor}, transparent)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 transition-opacity duration-200"
        style={{
          opacity: canScroll && fadeBottom ? 1 : 0,
          background: `linear-gradient(to top, ${fadeColor}, transparent)`,
        }}
      />
    </div>
  );
}

type ScrollFadeRowProps = {
  children: ReactNode;
  fadeColor?: string;
  className?: string;
};

export function ScrollFadeRow({ children, fadeColor = 'var(--gd-bg)', className = '' }: ScrollFadeRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setFadeLeft(el.scrollLeft > 2);
    setFadeRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateFades();
    el.addEventListener('scroll', updateFades, { passive: true });
    const ro = new ResizeObserver(updateFades);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateFades);
      ro.disconnect();
    };
  }, [updateFades]);

  return (
    <div className="relative">
      <div ref={scrollRef} className={`no-scrollbar overflow-x-auto ${className}`}>
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 transition-opacity duration-200"
        style={{
          opacity: fadeLeft ? 1 : 0,
          background: `linear-gradient(to right, ${fadeColor}, transparent)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 transition-opacity duration-200"
        style={{
          opacity: fadeRight ? 1 : 0,
          background: `linear-gradient(to left, ${fadeColor}, transparent)`,
        }}
      />
    </div>
  );
}
