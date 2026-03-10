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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://jakat.netlify.app'),
  title: {
    default: 'যাকাত ক্যালকুলেটর — পাঁচ মাযহাব সমর্থিত যাকাত হিসাব অ্যাপ',
    template: '%s | যাকাত ক্যালকুলেটর',
  },
  description: 'পাঁচ মাযহাব সমর্থিত সম্পূর্ণ যাকাত হিসাব অ্যাপ। হানাফি, শাফেয়ী, মালেকি, হাম্বলি ও আহলে হাদিস মাযহাব অনুযায়ী যাকাত গণনা করুন। লাইভ সোনা-রূপার দর, ১৮ ধরনের সম্পদ, কৃষি ও পশুসম্পদ যাকাত। সহীহ বুখারী ও মুসলিম হাদিস ভিত্তিক।',
  keywords: [
    'যাকাত ক্যালকুলেটর',
    'যাকাত হিসাব',
    'zakat calculator',
    'zakat calculator bangladesh',
    'বাংলাদেশ যাকাত',
    'হানাফি যাকাত',
    'শাফেয়ী যাকাত',
    'মালেকি যাকাত',
    'হাম্বলি যাকাত',
    'আহলে হাদিস যাকাত',
    'নিসাব হিসাব',
    'সোনার যাকাত',
    'রূপার যাকাত',
    'ব্যবসায়িক যাকাত',
    'কৃষি যাকাত',
    'পশুসম্পদ যাকাত',
    'zakat on gold',
    'zakat on silver',
    'nisab calculator',
    'islamic zakat',
    'bangla zakat calculator',
  ],
  authors: [{ name: 'Md Sabbir Ahmed', url: 'https://github.com/sabbir073' }],
  creator: 'Md Sabbir Ahmed',
  publisher: 'Md Sabbir Ahmed',
  applicationName: 'যাকাত ক্যালকুলেটর',
  category: 'finance',
  classification: 'Islamic Finance, Zakat Calculator',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    siteName: 'যাকাত ক্যালকুলেটর',
    title: 'যাকাত ক্যালকুলেটর — পাঁচ মাযহাব সমর্থিত যাকাত হিসাব অ্যাপ',
    description: 'পাঁচ মাযহাব সমর্থিত সম্পূর্ণ যাকাত হিসাব অ্যাপ। হানাফি, শাফেয়ী, মালেকি, হাম্বলি ও আহলে হাদিস মাযহাব অনুযায়ী যাকাত গণনা করুন। লাইভ সোনা-রূপার দর সহ।',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'যাকাত ক্যালকুলেটর — পাঁচ মাযহাব সমর্থিত',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'যাকাত ক্যালকুলেটর — পাঁচ মাযহাব সমর্থিত যাকাত হিসাব অ্যাপ',
    description: 'পাঁচ মাযহাব সমর্থিত সম্পূর্ণ যাকাত হিসাব অ্যাপ। লাইভ সোনা-রূপার দর, ১৮ ধরনের সম্পদ, কৃষি ও পশুসম্পদ যাকাত।',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'যাকাত ক্যালকুলেটর',
  },
  alternates: {
    canonical: '/',
  },
  other: {
    'google-site-verification': '',
    'mobile-web-app-capable': 'yes',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'যাকাত ক্যালকুলেটর',
    description: 'পাঁচ মাযহাব সমর্থিত সম্পূর্ণ যাকাত হিসাব অ্যাপ — হাদিস ভিত্তিক',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BDT',
    },
    author: {
      '@type': 'Person',
      name: 'Md Sabbir Ahmed',
      url: 'https://github.com/sabbir073',
    },
    inLanguage: 'bn',
    isAccessibleForFree: true,
  };

  return (
    <html lang="bn">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
