'use client';

import { formatBDT } from '@/lib/utils/formatters';

interface PriceDisplayProps {
  goldPrice: number;
  silverPrice: number;
  source: string;
  timestamp: string;
  isLoading: boolean;
  onManualClick?: () => void;
}

export default function PriceDisplay({
  goldPrice,
  silverPrice,
  source,
  timestamp,
  isLoading,
  onManualClick,
}: PriceDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded flex-1"></div>
          <div className="h-10 bg-gray-200 rounded flex-1"></div>
        </div>
      </div>
    );
  }

  const lastUpdated = timestamp
    ? new Date(timestamp).toLocaleString('bn-BD', {
        dateStyle: 'short',
        timeStyle: 'short',
      })
    : '';

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-700">বর্তমান বাজারদর</h3>
        <span className="text-[10px] text-gray-400">{lastUpdated}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gold-light/40 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">সোনা (প্রতি গ্রাম)</p>
          <p className="text-lg font-bold text-yellow-700">
            {formatBDT(goldPrice)}
          </p>
        </div>
        <div className="bg-silver-light/40 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">রূপা (প্রতি গ্রাম)</p>
          <p className="text-lg font-bold text-gray-600">
            {formatBDT(silverPrice)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-gray-400">
          সূত্র: {source === 'fallback' ? 'অফলাইন মূল্য' : source}
        </span>
        {onManualClick && (
          <button
            onClick={onManualClick}
            className="text-[10px] text-primary-600 underline"
          >
            ম্যানুয়ালি দিন
          </button>
        )}
      </div>
    </div>
  );
}
