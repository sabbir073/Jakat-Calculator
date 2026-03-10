'use client';

import { LivestockAssets } from '@/types/assets';
import InputField from '@/components/ui/InputField';
import Card from '@/components/ui/Card';
import ToggleSwitch from '@/components/ui/ToggleSwitch';

interface LivestockStepProps {
  data: LivestockAssets;
  onChange: (data: LivestockAssets) => void;
}

export default function LivestockStep({ data, onChange }: LivestockStepProps) {
  return (
    <Card icon="🐄" title="পশুসম্পদ">
      <ToggleSwitch
        enabled={data.enabled}
        onChange={(v) => onChange({ ...data, enabled: v })}
        label="আমার পশুসম্পদ আছে"
        description="চারণভূমিতে চরা পশু — খামারের পশু নয়"
      />

      {data.enabled && (
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
            📌 পশুসম্পদের যাকাত আর্থিক নয়, পশু দিয়ে দিতে হয়।
            শুধু চারণভূমিতে চরা পশুর উপর যাকাত — কাজে ব্যবহৃত পশুতে যাকাত নেই।
          </div>

          <InputField
            label="ছাগল / ভেড়া"
            description="চারণভূমিতে চরা ছাগল ও ভেড়ার সংখ্যা — নিসাব ৪০টি"
            value={data.sheepGoats}
            onChange={v => onChange({ ...data, sheepGoats: v })}
            unit="সংখ্যা"
          />

          <InputField
            label="গরু / মহিষ"
            description="চারণভূমিতে চরা গরু ও মহিষের সংখ্যা — নিসাব ৩০টি"
            value={data.cattle}
            onChange={v => onChange({ ...data, cattle: v })}
            unit="সংখ্যা"
          />

          <InputField
            label="উট"
            description="চারণভূমিতে চরা উটের সংখ্যা — নিসাব ৫টি"
            value={data.camels}
            onChange={v => onChange({ ...data, camels: v })}
            unit="সংখ্যা"
          />
        </div>
      )}
    </Card>
  );
}
