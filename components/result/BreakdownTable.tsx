'use client';

import { ZakatReport } from '@/types/calculation';
import { formatBDT } from '@/lib/utils/formatters';
import Card from '@/components/ui/Card';

interface BreakdownTableProps {
  report: ZakatReport;
}

export default function BreakdownTable({ report }: BreakdownTableProps) {
  const { wealth, agriculture, livestock, rikaz } = report;

  return (
    <div className="space-y-4">
      {/* Wealth breakdown */}
      <Card icon="📊" title="সম্পদ বিস্তারিত (২.৫%)">
        <div className="space-y-2">
          {wealth.breakdown.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-2 border-b border-gray-50 last:border-0 ${
                !item.included ? 'opacity-40' : ''
              }`}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{item.labelBn}</p>
                {item.note && (
                  <p className="text-[10px] text-gray-400">{item.note}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">
                  {formatBDT(item.valueBDT)}
                </p>
                {item.included && item.zakatAmount > 0 && (
                  <p className="text-[10px] text-primary-600">
                    যাকাত: {formatBDT(item.zakatAmount)}
                  </p>
                )}
                {!item.included && (
                  <p className="text-[10px] text-gray-400">অব্যাহতি</p>
                )}
              </div>
            </div>
          ))}

          {/* Debt row */}
          {wealth.totalDeductions > 0 && (
            <div className="flex items-center justify-between py-2 border-t-2 border-red-100">
              <p className="text-sm font-medium text-red-600">ঋণ (বাদ)</p>
              <p className="text-sm font-bold text-red-600">
                -{formatBDT(wealth.totalDeductions)}
              </p>
            </div>
          )}

          {/* Total row */}
          <div className="flex items-center justify-between py-3 bg-primary-50 rounded-xl px-3 mt-2">
            <p className="text-sm font-bold text-primary-800">সম্পদের যাকাত</p>
            <p className="text-lg font-bold text-primary-600">
              {formatBDT(wealth.zakatDue)}
            </p>
          </div>
        </div>
      </Card>

      {/* Agriculture */}
      {agriculture.enabled && (
        <Card icon="🌾" title="কৃষি যাকাত">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">ফসলের পরিমাণ</span>
              <span className="font-semibold">{agriculture.cropWeightKg} কেজি</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">নিসাব</span>
              <span className="font-semibold">{agriculture.nisabKg} কেজি</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">নিসাব পূরণ?</span>
              <span className={`font-semibold ${agriculture.meetsNisab ? 'text-green-600' : 'text-red-500'}`}>
                {agriculture.meetsNisab ? 'হ্যাঁ' : 'না'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">হার</span>
              <span className="font-semibold">{(agriculture.rate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between py-3 bg-primary-50 rounded-xl px-3 mt-2">
              <p className="font-bold text-primary-800">কৃষি যাকাত</p>
              <p className="text-lg font-bold text-primary-600">
                {formatBDT(agriculture.zakatDue)}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Livestock */}
      {livestock.enabled && livestock.items.length > 0 && (
        <Card icon="🐄" title="পশু যাকাত (বস্তুতে)">
          <div className="space-y-3">
            {livestock.items.map((item, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-700">
                    {item.animalTypeBn}
                  </span>
                  <span className="text-sm text-gray-500">{item.count}টি</span>
                </div>
                <p className="text-sm text-primary-600 font-bold">
                  → {item.zakatDescriptionBn}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Rikaz */}
      {rikaz.enabled && (
        <Card icon="💎" title="খনিজ যাকাত (২০%)">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">সম্পদের মূল্য</span>
              <span className="font-semibold">{formatBDT(rikaz.valueBDT)}</span>
            </div>
            <div className="flex items-center justify-between py-3 bg-primary-50 rounded-xl px-3 mt-2">
              <p className="font-bold text-primary-800">খনিজ যাকাত</p>
              <p className="text-lg font-bold text-primary-600">
                {formatBDT(rikaz.zakatDue)}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
