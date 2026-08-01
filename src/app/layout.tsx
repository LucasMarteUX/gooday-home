import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/gooday/theme";
import { SoftCursor } from "@/components/gooday/SoftCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gooday",
  description: "Gooday — comunidade de bem-estar",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gooday",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#E7FE8E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full w-full bg-gd-bg`} data-theme="light" style={{ colorScheme: "light" }} suppressHydrationWarning>
      <body className={`${inter.className} mx-auto min-h-full w-full max-w-[1920px] bg-gd-bg font-sans text-gd-text antialiased`}>
        <ThemeProvider>
          <SoftCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
