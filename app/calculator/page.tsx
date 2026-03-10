'use client';

import { useState } from 'react';
import { ZakatReport } from '@/types/calculation';
import CalculatorWizard from '@/components/calculator/CalculatorWizard';
import ZakatSummary from '@/components/result/ZakatSummary';
import BreakdownTable from '@/components/result/BreakdownTable';
import Link from 'next/link';

export default function CalculatorPage() {
  const [report, setReport] = useState<ZakatReport | null>(null);

  if (report) {
    return (
      <div className="max-w-lg mx-auto px-4 py-4">
        <h1 className="text-xl font-bold text-primary-800 text-center mb-4">
          📊 যাকাত রিপোর্ট
        </h1>

        <div className="space-y-4">
          <ZakatSummary report={report} />
          <BreakdownTable report={report} />

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setReport(null)}
              className="flex-1 h-12 rounded-xl border-2 border-primary-200 text-primary-600 font-bold text-sm"
            >
              ← আবার হিসাব করুন
            </button>
            <Link
              href="/recipients"
              className="flex-1 h-12 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center justify-center"
            >
              যাকাত প্রাপক →
            </Link>
          </div>

          {/* Hadith reference */}
          <div className="bg-gray-50 rounded-xl p-4 mt-4">
            <h4 className="text-sm font-bold text-gray-700 mb-2">📖 যাকাত সম্পর্কিত হাদিস</h4>
            <div className="text-xs text-gray-600 space-y-2">
              <p>
                &ldquo;রূপায় (যাকাত) এক-দশমাংশের এক-চতুর্থাংশ (২.৫%)।&rdquo;
                <span className="text-gray-400"> — সহীহ বুখারী ১৪৫৪</span>
              </p>
              <p>
                &ldquo;২০ দিনারের কমে যাকাত নেই।&rdquo;
                <span className="text-gray-400"> — আবু দাউদ ১৫৭৩</span>
              </p>
              <p>
                &ldquo;৫ ওয়াসাকের কমে যাকাত নেই।&rdquo;
                <span className="text-gray-400"> — সহীহ বুখারী ১৪৮৪</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <CalculatorWizard onResult={setReport} />;
}
