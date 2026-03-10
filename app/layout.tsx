import type { Metadata, Viewport } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/ui/BottomNav';
import Footer from '@/components/ui/Footer';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '600', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'যাকাত ক্যালকুলেটর',
  description: 'পাঁচ মাযহাব সমর্থিত সম্পূর্ণ যাকাত হিসাব অ্যাপ — হাদিস ভিত্তিক',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'যাকাত ক্যালকুলেটর',
  },
};

export const viewport: Viewport = {
  themeColor: '#166534',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.className} antialiased pb-20`}>
        <main className="min-h-screen">
          {children}
          <Footer />
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
