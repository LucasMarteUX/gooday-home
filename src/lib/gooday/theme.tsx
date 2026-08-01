'use client';

import type { ReactNode } from 'react';

/** Tema único: light mode Gooday. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return children;
}

/** @deprecated Mantido para imports legados — sempre light. */
export function useTheme() {
  return {
    theme: 'light' as const,
    isLight: true,
    isDark: false,
    toggleTheme: () => undefined,
    setTheme: (_theme: 'light' | 'dark') => undefined,
  };
}

/** Logo Gooday (anexo) — preto no light. */
export function GoodayLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src="/uploads/gooday-logo.png"
      alt="Gooday"
      className={`gd-logo ${className}`}
      draggable={false}
    />
  );
}
