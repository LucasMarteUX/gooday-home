'use client';

import { useEffect } from 'react';

/** Sincroniza data-theme no <html> enquanto /language estiver montado. */
export function LanguageThemeSync() {
  useEffect(() => {
    const html = document.documentElement;
    const prevTheme = html.getAttribute('data-theme');
    const prevScheme = html.style.colorScheme;
    html.setAttribute('data-theme', 'language');
    html.style.colorScheme = 'light';
    return () => {
      if (prevTheme) html.setAttribute('data-theme', prevTheme);
      else html.removeAttribute('data-theme');
      html.style.colorScheme = prevScheme || 'light';
    };
  }, []);

  return null;
}
