'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  hadith?: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'যাকাত কী?',
    answer: 'যাকাত ইসলামের পাঁচটি স্তম্ভের একটি। নিসাব পরিমাণ সম্পদের মালিক প্রত্যেক মুসলিমের জন্য বাধ্যতামূলক। সাধারণত মোট সম্পদের ২.৫% হারে প্রদান করতে হয়।',
    hadith: 'সহীহ বুখারী ৮ — ইসলামের পাঁচটি স্তম্ভ',
  },
  {
    question: 'নিসাব কী? কত?',
    answer: 'নিসাব হলো ন্যূনতম সম্পদের পরিমাণ যার উপর যাকাত ফরজ হয়।\n\nসোনার নিসাব: ৮৫-৮৭.৪৮ গ্রাম (মাযহাব ভেদে)\nরূপার নিসাব: ৫৯৫-৬১২.৩৬ গ্রাম (মাযহাব ভেদে)\n\nহানাফি ও আহলে হাদিস মাযহাব রূপার নিসাব ব্যবহার করে (কম, তাই বেশি মানুষের উপর ফরজ হয়)। শাফেয়ী, মালেকি ও হাম্বলি মাযহাব সোনার নিসাব ব্যবহার করে।',
    hadith: '২০ দিনারের কমে যাকাত নেই — আবু দাউদ ১৫৭৩\n৫ আউকিয়ার কমে যাকাত নেই — সহীহ বুখারী/মুসলিম',
  },
  {
    question: 'হাওল কী?',
    answer: 'হাওল মানে ১ হিজরি বছর (৩৫৪-৩৫৫ দিন)। সম্পদ নিসাব পরিমাণে পৌঁছানোর পর ১ বছর অতিবাহিত হলে যাকাত ফরজ হয়।\n\nব্যতিক্রম: কৃষি ফসল ও খনিজ সম্পদে (রিকায) হাওলের শর্ত নেই — ফসল কাটার সময়ই যাকাত দিতে হবে।',
  },
  {
    question: 'ব্যবহৃত গহনায় কি যাকাত দিতে হবে?',
    answer: 'এটি মাযহাব ভেদে আলাদা:\n\n✅ হানাফি ও আহলে হাদিস: সকল সোনা-রূপায় যাকাত ফরজ, গহনা হলেও।\n\n❌ শাফেয়ী, মালেকি, হাম্বলি: ব্যবহৃত গহনায় যাকাত নেই (শুধু বিনিয়োগ/সঞ্চয়ের সোনায় যাকাত)।',
    hadith: 'এ বিষয়ে উলামাদের মধ্যে মতভেদ আছে। উভয় পক্ষে হাদিসের দলিল রয়েছে।',
  },
  {
    question: 'কৃষি ফসলে যাকাতের হার কত?',
    answer: '• প্রাকৃতিক পানিতে (বৃষ্টি/নদী): ১০%\n• কৃত্রিম সেচে (পাম্প/খাল): ৫%\n• মিশ্র পদ্ধতি: ৭.৫%\n\nনিসাব: ৫ ওয়াসাক (আনুমানিক ৬৫৩ কেজি)।\nহাওলের শর্ত নেই — ফসল কাটার সময়ই যাকাত দিতে হবে।',
    hadith: 'আকাশ ও ঝরনার পানিতে সিক্ত ফসলে এক-দশমাংশ, আর সেচে অর্ধ-দশমাংশ — সহীহ বুখারী',
  },
  {
    question: 'পশুসম্পদে কি যাকাত দিতে হবে?',
    answer: 'হ্যাঁ, চারণভূমিতে চরা পশুতে যাকাত আছে:\n\n🐑 ছাগল/ভেড়া: ৪০+ হলে যাকাত শুরু\n🐄 গরু: ৩০+ হলে যাকাত শুরু\n🐪 উট: ৫+ হলে যাকাত শুরু\n\nকাজে ব্যবহৃত (হালচাষ, বোঝা বহন) পশুতে যাকাত নেই। পশুর যাকাত টাকায় নয়, পশু দিয়ে দিতে হয়।',
    hadith: 'সহীহ বুখারী — কিতাবুজ জাকাত (পশুসম্পদ অধ্যায়)',
  },
  {
    question: 'রিকায (প্রোথিত সম্পদ) এর যাকাত কত?',
    answer: 'রিকায (মাটির নিচে প্রাপ্ত সোনা, রূপা বা মূল্যবান সম্পদ) এর যাকাত ২০% (এক-পঞ্চমাংশ)।\n\nএতে হাওল বা নিসাবের শর্ত নেই।',
    hadith: 'রিকাযে এক-পঞ্চমাংশ (দিতে হবে) — সহীহ বুখারী ৫৭৫',
  },
  {
    question: 'আত্মীয়কে কি যাকাত দেওয়া যায়?',
    answer: 'হ্যাঁ, তবে শর্ত আছে:\n\n✅ যাকাত দেওয়া যায়: ভাই, বোন, চাচা, মামা, ভাতিজা, ভাগ্নে ইত্যাদি (যারা ৮ শ্রেণির কোনো একটিতে পড়ে)\n\n❌ যাকাত দেওয়া যায় না: বাবা-মা, দাদা-দাদি (উর্ধ্বতন), সন্তান (অধস্তন), এবং স্বামী/স্ত্রী\n\nগরীব আত্মীয়কে যাকাত দিলে দ্বিগুণ সওয়াব — সদকা ও আত্মীয়তা রক্ষা।',
  },
  {
    question: 'যাকাতুল ফিতর ও যাকাতুল মালের পার্থক্য কী?',
    answer: '• যাকাতুল ফিতর: রমযানের শেষে ঈদুল ফিতরের আগে দিতে হয়। প্রতিটি মুসলিমের জন্য বাধ্যতামূলক।\n\n• যাকাতুল মাল: সম্পদের উপর বছরে একবার দিতে হয়। শুধু নিসাব পরিমাণ সম্পদের মালিকদের জন্য।\n\nএই অ্যাপটি যাকাতুল মাল হিসাব করে।',
  },
];

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex items-center justify-between"
      >
        <span className="font-semibold text-sm text-gray-800 pr-4">
          {item.question}
        </span>
        <span
          className={`text-primary-600 text-lg transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-50">
          <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed mt-3">
            {item.answer}
          </p>
          {item.hadith && (
            <div className="mt-3 bg-primary-50 rounded-lg p-3">
              <p className="text-xs text-primary-700 whitespace-pre-line">
                📖 {item.hadith}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-primary-800 text-center mb-2">
        ❓ যাকাত প্রশ্নোত্তর
      </h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        যাকাত সম্পর্কে সচরাচর জিজ্ঞাসা — হাদিস ভিত্তিক উত্তর
      </p>

      <div className="space-y-3">
        {FAQ_DATA.map((item, i) => (
          <FAQAccordion key={i} item={item} index={i} />
        ))}
      </div>

      {/* Madhab comparison table */}
      <div className="mt-8 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm overflow-x-auto">
        <h3 className="font-bold text-sm text-primary-600 mb-3">
          📊 মাযহাব তুলনা চার্ট
        </h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-primary-50">
              <th className="p-2 text-left">বিষয়</th>
              <th className="p-2">হানাফি</th>
              <th className="p-2">শাফেয়ী</th>
              <th className="p-2">মালেকি</th>
              <th className="p-2">হাম্বলি</th>
              <th className="p-2">আহলে হাদিস</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-50">
              <td className="p-2 font-semibold">নিসাব মানদণ্ড</td>
              <td className="p-2 text-center">রূপা</td>
              <td className="p-2 text-center">সোনা</td>
              <td className="p-2 text-center">সোনা</td>
              <td className="p-2 text-center">সোনা</td>
              <td className="p-2 text-center">রূপা</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="p-2 font-semibold">সোনার নিসাব</td>
              <td className="p-2 text-center">৮৭.৪৮ গ্রাম</td>
              <td className="p-2 text-center">৮৭.৪৮ গ্রাম</td>
              <td className="p-2 text-center">৮৫ গ্রাম</td>
              <td className="p-2 text-center">৮৫ গ্রাম</td>
              <td className="p-2 text-center">৮৫ গ্রাম</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="p-2 font-semibold">রূপার নিসাব</td>
              <td className="p-2 text-center">৬১২.৩৬ গ্রাম</td>
              <td className="p-2 text-center">৬১২.৩৬ গ্রাম</td>
              <td className="p-2 text-center">৫৯৫ গ্রাম</td>
              <td className="p-2 text-center">৫৯৫ গ্রাম</td>
              <td className="p-2 text-center">৫৯৫ গ্রাম</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">গহনায় যাকাত</td>
              <td className="p-2 text-center text-green-600">হ্যাঁ ✓</td>
              <td className="p-2 text-center text-red-500">না ✗</td>
              <td className="p-2 text-center text-red-500">না ✗</td>
              <td className="p-2 text-center text-red-500">না ✗</td>
              <td className="p-2 text-center text-green-600">হ্যাঁ ✓</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
