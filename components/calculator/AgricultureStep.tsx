'use client';

import { AgriculturalAssets } from '@/types/assets';
import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/SelectField';
import Card from '@/components/ui/Card';
import ToggleSwitch from '@/components/ui/ToggleSwitch';

interface AgricultureStepProps {
  data: AgriculturalAssets;
  onChange: (data: AgriculturalAssets) => void;
}

export default function AgricultureStep({ data, onChange }: AgricultureStepProps) {
  return (
    <Card icon="🌾" title="কৃষি পণ্য">
      <ToggleSwitch
        enabled={data.enabled}
        onChange={(v) => onChange({ ...data, enabled: v })}
        label="আমার কৃষিপণ্য আছে"
        description="ফসল, ফল, শস্য ইত্যাদি"
      />

      {data.enabled && (
        <div className="space-y-3">
          <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-700">
            📌 কৃষি যাকাতে হাওল লাগে না। ফসল কাটার সময়ই যাকাত দিতে হবে।
            নিসাব: ৬৫৩ কেজি (৫ ওয়াসাক)।
            প্রাকৃতিক সেচে ১০%, কৃত্রিম সেচে ৫%, মিশ্র সেচে ৭.৫%।
          </div>

          <InputField
            label="ফসলের পরিমাণ"
            description="মোট ফসলের ওজন কেজিতে"
            value={data.cropWeightKg}
            onChange={v => onChange({ ...data, cropWeightKg: v })}
            unit="কেজি"
          />

          <InputField
            label="ফসলের বাজারমূল্য"
            description="বর্তমান বাজারে ফসলের মোট মূল্য টাকায়"
            value={data.cropValueBDT}
            onChange={v => onChange({ ...data, cropValueBDT: v })}
            unit="৳"
          />

          <SelectField
            label="সেচ পদ্ধতি"
            description="ফসল কিভাবে পানি পেয়েছে"
            value={data.irrigationType}
            onChange={v =>
              onChange({
                ...data,
                irrigationType: v as 'natural' | 'irrigated' | 'mixed',
              })
            }
            options={[
              { value: 'natural', label: 'প্রাকৃতিক (বৃষ্টি/নদী) — ১০%' },
              { value: 'irrigated', label: 'কৃত্রিম সেচ (পাম্প/খাল) — ৫%' },
              { value: 'mixed', label: 'মিশ্র পদ্ধতি — ৭.৫%' },
            ]}
          />
        </div>
      )}
    </Card>
  );
}
