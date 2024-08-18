import { WEBSITE_NAME } from '@/features/common';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} | URL Shortener`,
  description: `${WEBSITE_NAME} | URL Shortener | Save important links by your specific URL`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} relative`}>{children}</body>
    </html>
  );
}
