import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import { PetsThemeSync } from '@/components/gooday/PetsThemeSync';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-petshare',
  weight: ['600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Petshare',
  description: 'Petshare — comunidade fofa de pets e tutores',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Petshare',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#fff6f0',
};

export default function PetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="pets" className={`pets-atmosphere min-h-dvh w-full ${nunito.variable}`}>
      <PetsThemeSync />
      {children}
    </div>
  );
}
