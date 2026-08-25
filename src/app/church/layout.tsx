import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import { ChurchThemeSync } from '@/components/gooday/ChurchThemeSync';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-one',
  weight: ['500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ONE',
  description: 'ONE — pessoas, igrejas e comunidades conectadas',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ONE',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#050505',
};

export default function ChurchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="church" className={`church-atmosphere min-h-dvh w-full ${outfit.variable}`}>
      <ChurchThemeSync />
      {children}
    </div>
  );
}
