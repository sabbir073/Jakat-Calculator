'use client';

import { BusinessAssets } from '@/types/assets';
import { BUSINESS_CATEGORIES } from '@/lib/constants/asset-categories';
import InputField from '@/components/ui/InputField';
import Card from '@/components/ui/Card';

interface BusinessStepProps {
  data: BusinessAssets;
  onChange: (data: BusinessAssets) => void;
}

export default function BusinessStep({ data, onChange }: BusinessStepProps) {
  const handleChange = (key: keyof BusinessAssets, value: number) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <Card icon="🏪" title="ব্যবসা ও ভাড়া">
      {BUSINESS_CATEGORIES.map(cat => (
        <InputField
          key={cat.id}
          label={cat.labelBn}
          description={cat.descriptionBn}
          value={data[cat.id as keyof BusinessAssets]}
          onChange={v => handleChange(cat.id as keyof BusinessAssets, v)}
          unit={cat.unit}
        />
      ))}
    </Card>
  );
}
