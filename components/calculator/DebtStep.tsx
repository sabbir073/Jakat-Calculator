'use client';

import InputField from '@/components/ui/InputField';
import Card from '@/components/ui/Card';

interface DebtStepProps {
  debt: number;
  onChange: (debt: number) => void;
}

export default function DebtStep({ debt, onChange }: DebtStepProps) {
  return (
    <Card icon="📉" title="ঋণ / দেনা">
      <div className="bg-red-50 rounded-xl p-3 mb-4 text-xs text-red-700">
        📌 আপনার উপর বকেয়া ঋণ/দেনা মোট সম্পদ থেকে বাদ দেওয়া হবে।
        ঋণ বাদ দেওয়ার পর সম্পদ নিসাবের নিচে গেলে যাকাত ফরজ হবে না।
      </div>

      <InputField
        label="মোট ঋণ / দেনা"
        description="আপনার উপর সকল বকেয়া ঋণ, বাকি, কিস্তি ইত্যাদির মোট পরিমাণ"
        value={debt}
        onChange={onChange}
        unit="৳"
      />
    </Card>
  );
}
