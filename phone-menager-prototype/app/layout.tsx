import Navbar from '@/components/navbar';
import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'M Phone',
  description: 'A tecnologia em suas mãos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
