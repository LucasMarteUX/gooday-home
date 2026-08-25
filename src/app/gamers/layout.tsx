import type { Metadata, Viewport } from 'next';
import { Orbitron } from 'next/font/google';
import { GamersThemeSync } from '@/components/gooday/GamersThemeSync';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-xpzone',
  weight: ['600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'XP Zone',
  description: 'XP Zone — comunidade cyberpunk de games',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'XP Zone',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#071118',
};

export default function GamersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="gamers" className={`gamers-atmosphere min-h-dvh w-full ${orbitron.variable}`}>
      <GamersThemeSync />
      {children}
    </div>
  );
}
