import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const iranSans = localFont({ src: '../../public/fonts/IRANSans.woff2' });

export const metadata: Metadata = {
 title: 'بازی مافیا سناریو زودیاک ساخت امیررضا کدخدازاده',
 description: 'This is a game which created by Amirreza Kadkhodazadeh',
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang='fa' dir='rtl'>
   <body className={`${iranSans.className} antialiased`}>{children}</body>
  </html>
 );
}
