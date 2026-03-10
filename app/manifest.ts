import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'যাকাত ক্যালকুলেটর',
    short_name: 'যাকাত',
    description: 'পাঁচ মাযহাব সমর্থিত সম্পূর্ণ যাকাত হিসাব অ্যাপ — হাদিস ভিত্তিক',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0fdf4',
    theme_color: '#166534',
    lang: 'bn',
    dir: 'ltr',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
