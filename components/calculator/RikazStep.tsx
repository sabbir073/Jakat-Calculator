'use client';

import { RikazAssets } from '@/types/assets';
import InputField from '@/components/ui/InputField';
import Card from '@/components/ui/Card';
import ToggleSwitch from '@/components/ui/ToggleSwitch';

interface RikazStepProps {
  data: RikazAssets;
  onChange: (data: RikazAssets) => void;
}

export default function RikazStep({ data, onChange }: RikazStepProps) {
  return (
    <Card icon="💎" title="খনিজ সম্পদ / রিকায">
      <ToggleSwitch
        enabled={data.enabled}
        onChange={(v) => onChange({ ...data, enabled: v })}
        label="আমার খনিজ/প্রোথিত সম্পদ আছে"
        description="মাটির নিচে প্রাপ্ত সোনা, রূপা বা মূল্যবান সম্পদ"
      />

      {data.enabled && (
        <div className="space-y-3">
          <div className="bg-purple-50 rounded-xl p-3 text-xs text-purple-700">
            📌 রিকায (প্রোথিত সম্পদ) এর যাকাত ২০% (এক-পঞ্চমাংশ/খুমুস)।
            এতে হাওল বা নিসাবের শর্ত নেই।
            হাদিস: &ldquo;রিকাযে এক-পঞ্চমাংশ (দিতে হবে)&rdquo; — সহীহ বুখারী
          </div>

          <InputField
            label="খনিজ সম্পদের মূল্য"
            description="প্রাপ্ত খনিজ বা প্রোথিত সম্পদের বর্তমান বাজারমূল্য"
            value={data.valueBDT}
            onChange={v => onChange({ ...data, valueBDT: v })}
            unit="৳"
          />
        </div>
      )}
    </Card>
  );
}
