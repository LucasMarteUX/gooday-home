'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

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
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;

    const check = () => {
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
  }, []);

  return (
    <StickySidebarContext.Provider value={stuck}>
      <aside
        ref={asideRef}
        className={`gooday-sidebar-sticky flex min-h-0 min-w-0 flex-col gap-3.5 ${stuck || alwaysActive ? 'gooday-sidebar-sticky--active' : ''} ${className}`}
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
  const [scrolled, setScrolled] = useState(false);
  const canScroll = stuck || alwaysScrollable;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => setScrolled(el.scrollTop > 2);
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => el.removeEventListener('scroll', onScroll);
  }, [canScroll]);

  useEffect(() => {
    if (!canScroll) {
      scrollRef.current?.scrollTo({ top: 0 });
      setScrolled(false);
    }
  }, [canScroll]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        className={`no-scrollbar flex min-h-0 flex-col ${canScroll ? 'flex-1 overflow-y-auto' : ''} ${className}`}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 transition-opacity duration-200"
        style={{
          opacity: canScroll && scrolled ? 1 : 0,
          background: `linear-gradient(to bottom, ${fadeColor}, transparent)`,
        }}
      />
    </div>
  );
}
