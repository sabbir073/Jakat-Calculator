'use client';

import { ZakatReport } from '@/types/calculation';
import { formatBDT } from '@/lib/utils/formatters';

interface ZakatSummaryProps {
  report: ZakatReport;
}

export default function ZakatSummary({ report }: ZakatSummaryProps) {
  const isZakatDue = report.totalMonetaryZakat > 0 || report.livestock.enabled;

  return (
    <div
      className={`rounded-2xl p-6 text-center ${
        isZakatDue
          ? 'bg-gradient-to-br from-primary-500 to-primary-700'
          : 'bg-gradient-to-br from-gray-400 to-gray-600'
      } text-white shadow-xl`}
    >
      <p className="text-sm opacity-80 mb-1">
        {report.madhabNameBn} মাযহাব অনুযায়ী
      </p>
      <h2 className="text-lg font-bold mb-3">
        {isZakatDue ? 'আপনার মোট যাকাত' : 'আপনার উপর যাকাত ফরজ নয়'}
      </h2>

      {isZakatDue && (
        <>
          <p className="text-4xl font-bold mb-2">
            {formatBDT(report.totalMonetaryZakat)}
          </p>
          <p className="text-xs opacity-70">
            (সম্পদ: {formatBDT(report.wealth.totalAssets)} | ঋণ বাদে: {formatBDT(report.wealth.netAssets)} | নিসাব: {formatBDT(report.wealth.nisabBDT)})
          </p>
        </>
      )}

      {!isZakatDue && !report.hawlMet && (
        <p className="text-sm opacity-80 mt-2">
          হাওল (১ হিজরি বছর) পূর্ণ হয়নি।
        </p>
      )}

      {!isZakatDue && report.hawlMet && !report.wealth.meetsNisab && (
        <p className="text-sm opacity-80 mt-2">
          আপনার সম্পদ নিসাবের কম।<br />
          নিসাব: {formatBDT(report.wealth.nisabBDT)} ({report.wealth.nisabStandard === 'gold' ? 'সোনার মান' : 'রূপার মান'})
        </p>
      )}
    </div>
  );
}
