'use client';

import { MADHAB_LIST } from '@/lib/constants/madhab-config';
import { MadhabId } from '@/types/madhab';
import Card from '@/components/ui/Card';

interface MadhabSelectorProps {
  madhabId: MadhabId;
  hawlMet: boolean;
  onMadhabChange: (id: MadhabId) => void;
  onHawlChange: (met: boolean) => void;
}

export default function MadhabSelector({
  madhabId,
  hawlMet,
  onMadhabChange,
  onHawlChange,
}: MadhabSelectorProps) {
  return (
    <div className="space-y-4">
      <Card icon="📖" title="মাযহাব নির্বাচন করুন">
        <p className="text-xs text-gray-500 mb-4">
          (আপনার অনুসৃত মাযহাব বেছে নিন — এটি নিসাব ও গহনার যাকাত নির্ধারণে ব্যবহৃত হবে)
        </p>
        <div className="space-y-2">
          {MADHAB_LIST.map(m => (
            <button
              key={m.id}
              onClick={() => onMadhabChange(m.id)}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                madhabId === m.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-100 bg-white hover:border-primary-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">{m.nameBn}</span>
                <span className="text-xs text-gray-400">{m.nameEn}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{m.description}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card icon="📅" title="হাওল (বছর) পূর্ণ হয়েছে?">
        <p className="text-xs text-gray-500 mb-3">
          (আপনার সম্পদ নিসাব পরিমাণ পৌঁছানোর পর কি ১ হিজরি বছর অতিবাহিত হয়েছে?)
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => onHawlChange(true)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              hawlMet
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-50 text-gray-600 border border-gray-200'
            }`}
          >
            হ্যাঁ
          </button>
          <button
            onClick={() => onHawlChange(false)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              !hawlMet
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-50 text-gray-600 border border-gray-200'
            }`}
          >
            না
          </button>
        </div>
        {!hawlMet && (
          <p className="text-xs text-red-500 mt-2">
            হাওল পূর্ণ না হলে সম্পদের উপর যাকাত ফরজ হয় না। তবে কৃষি ও খনিজ সম্পদে হাওল লাগে না।
          </p>
        )}
      </Card>
    </div>
  );
}
