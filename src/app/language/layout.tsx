import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { LanguageThemeSync } from '@/components/gooday/LanguageThemeSync';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-lingo',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LINGO',
  description: 'LINGO — Learn through people. Speak. Connect. Belong.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LINGO',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F7F7F5',
};

export default function LanguageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="language" className={`language-atmosphere min-h-dvh w-full ${jakarta.variable}`}>
      <LanguageThemeSync />
      {children}
    </div>
  );
}
