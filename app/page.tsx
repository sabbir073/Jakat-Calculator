'use client';

import Link from 'next/link';
import PriceDisplay from '@/components/ui/PriceDisplay';
import ViewCounter from '@/components/ui/ViewCounter';
import { useMetalPrices } from '@/lib/hooks/useMetalPrices';

export default function HomePage() {
  const { prices, isLoading } = useMetalPrices();

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Hero */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-3">🕌</div>
        <h1 className="text-2xl font-bold text-primary-800 mb-2">
          যাকাত ক্যালকুলেটর
        </h1>
        <ViewCounter />
        <p className="text-sm text-gray-500 leading-relaxed mt-2">
          পাঁচ মাযহাব সমর্থিত সম্পূর্ণ যাকাত হিসাব অ্যাপ<br />
          হাদিস ভিত্তিক — সহীহ বুখারী ও মুসলিম অনুযায়ী
        </p>
      </div>

      {/* Live prices */}
      <div className="mb-6">
        <PriceDisplay
          goldPrice={prices?.goldPerGramBDT || 0}
          silverPrice={prices?.silverPerGramBDT || 0}
          source={prices?.source || ''}
          timestamp={prices?.timestamp || ''}
          isLoading={isLoading}
        />
      </div>

      {/* CTA */}
      <Link
        href="/calculator"
        className="block w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-700 text-white text-center font-bold text-lg shadow-xl hover:shadow-2xl transition-all mb-6"
      >
        🧮 যাকাত হিসাব শুরু করুন
      </Link>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: '📖', title: '৫ মাযহাব', desc: 'হানাফি, শাফেয়ী, মালেকি, হাম্বলি, আহলে হাদিস' },
          { icon: '✨', title: 'লাইভ দর', desc: 'স্বয়ংক্রিয় সোনা ও রূপার বাজারদর' },
          { icon: '📊', title: '১৮ ধরনের সম্পদ', desc: 'নগদ, সোনা, স্টক, ক্রিপ্টো, কৃষি, পশু' },
          { icon: '📱', title: 'অফলাইন সমর্থন', desc: 'ইন্টারনেট ছাড়াও ব্যবহার করুন' },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <span className="text-2xl">{f.icon}</span>
            <h3 className="font-bold text-sm text-gray-800 mt-2">{f.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Hadith quote */}
      <div className="bg-primary-50 rounded-2xl p-5 border border-primary-100">
        <p className="text-sm text-primary-800 leading-relaxed text-center italic">
          &ldquo;ইসলামের পাঁচটি স্তম্ভ — আল্লাহ ছাড়া কোনো ইলাহ নেই ও মুহাম্মদ (সা.) তাঁর রাসূল এই সাক্ষ্য দেওয়া, সালাত কায়েম করা, যাকাত দেওয়া, হজ্জ করা ও রমযানের রোযা রাখা।&rdquo;
        </p>
        <p className="text-xs text-primary-600 text-center mt-2">
          — সহীহ বুখারী ৮, সহীহ মুসলিম ১৬
        </p>
      </div>

      {/* Quick info */}
      <div className="mt-6 space-y-3">
        <h3 className="font-bold text-gray-700">যাকাত কখন ফরজ?</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            ১. সম্পদ <strong>নিসাব</strong> পরিমাণ পৌঁছাতে হবে (সোনা ৮৫-৮৭.৪৮ গ্রাম অথবা রূপা ৫৯৫-৬১২.৩৬ গ্রাম মাযহাব ভেদে)
          </p>
          <p>
            ২. সম্পদ নিসাব পরিমাণে থাকা অবস্থায় <strong>১ হিজরি বছর</strong> (হাওল) অতিবাহিত হতে হবে
          </p>
          <p>
            ৩. যাকাতের হার সাধারণত <strong>২.৫%</strong> (এক-চল্লিশ ভাগের এক ভাগ)
          </p>
        </div>
      </div>
    </div>
  );
}
