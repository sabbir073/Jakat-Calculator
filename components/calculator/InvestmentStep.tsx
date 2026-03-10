'use client';

import { InvestmentAssets } from '@/types/assets';
import { INVESTMENT_CATEGORIES } from '@/lib/constants/asset-categories';
import InputField from '@/components/ui/InputField';
import Card from '@/components/ui/Card';

interface InvestmentStepProps {
  data: InvestmentAssets;
  onChange: (data: InvestmentAssets) => void;
}

export default function InvestmentStep({ data, onChange }: InvestmentStepProps) {
  const handleChange = (key: keyof InvestmentAssets, value: number) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <Card icon="📈" title="বিনিয়োগ">
      {INVESTMENT_CATEGORIES.map(cat => (
        <InputField
          key={cat.id}
          label={cat.labelBn}
          description={cat.descriptionBn}
          value={data[cat.id as keyof InvestmentAssets]}
          onChange={v => handleChange(cat.id as keyof InvestmentAssets, v)}
          unit={cat.unit}
        />
      ))}
    </Card>
  );
}
