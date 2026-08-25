import type { Metadata, Viewport } from 'next';
import { DM_Sans, Newsreader } from 'next/font/google';
import { RoamThemeSync } from '@/components/gooday/RoamThemeSync';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-roam',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-roam-display',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ROAM',
  description: 'ROAM — Explore. Move. Belong. Discover countries through people who know them.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ROAM',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F3F0E9',
};

export default function RoamLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme="roam"
      className={`roam-atmosphere min-h-dvh w-full ${dmSans.variable} ${newsreader.variable}`}
    >
      <RoamThemeSync />
      {children}
    </div>
  );
}
