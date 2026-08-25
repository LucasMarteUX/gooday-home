'use client';

import { useEffect } from 'react';

/** Sincroniza data-theme no <html> enquanto /church estiver montado. */
export function ChurchThemeSync() {
  useEffect(() => {
    const html = document.documentElement;
    const prevTheme = html.getAttribute('data-theme');
    const prevScheme = html.style.colorScheme;
    html.setAttribute('data-theme', 'church');
    html.style.colorScheme = 'dark';
    return () => {
      if (prevTheme) html.setAttribute('data-theme', prevTheme);
      else html.removeAttribute('data-theme');
      html.style.colorScheme = prevScheme || 'light';
    };
  }, []);

  return null;
}
