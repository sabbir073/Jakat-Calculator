'use client';

import { CashAssets } from '@/types/assets';
import { CASH_CATEGORIES } from '@/lib/constants/asset-categories';
import InputField from '@/components/ui/InputField';
import Card from '@/components/ui/Card';

interface CashStepProps {
  data: CashAssets;
  onChange: (data: CashAssets) => void;
}

export default function CashStep({ data, onChange }: CashStepProps) {
  const handleChange = (key: keyof CashAssets, value: number) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <Card icon="💵" title="নগদ সম্পদ">
      {CASH_CATEGORIES.map(cat => (
        <InputField
          key={cat.id}
          label={cat.labelBn}
          description={cat.descriptionBn}
          value={data[cat.id as keyof CashAssets]}
          onChange={v => handleChange(cat.id as keyof CashAssets, v)}
          unit={cat.unit}
        />
      ))}
    </Card>
  );
}
