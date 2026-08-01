'use client';

import type { ReactNode } from 'react';

export { GoodayLogo } from '@/components/gooday/GoodayLogo';

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
