import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gooday Home",
  description: "Gooday Home — mobile-first social experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full w-full bg-gd-bg`}>
      <body className={`${inter.className} mx-auto min-h-full w-full max-w-[1920px] bg-gd-bg font-sans text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
