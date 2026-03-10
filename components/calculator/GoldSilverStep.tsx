'use client';

import { GoldSilverAssets } from '@/types/assets';
import { GOLD_SILVER_CATEGORIES } from '@/lib/constants/asset-categories';
import { MADHAB_CONFIGS } from '@/lib/constants/madhab-config';
import { MadhabId } from '@/types/madhab';
import InputField from '@/components/ui/InputField';
import Card from '@/components/ui/Card';
import PriceDisplay from '@/components/ui/PriceDisplay';

interface GoldSilverStepProps {
  data: GoldSilverAssets;
  onChange: (data: GoldSilverAssets) => void;
  madhabId: MadhabId;
  goldPrice: number;
  silverPrice: number;
  priceSource: string;
  priceTimestamp: string;
  priceLoading: boolean;
  onManualPrice?: () => void;
}

export default function GoldSilverStep({
  data,
  onChange,
  madhabId,
  goldPrice,
  silverPrice,
  priceSource,
  priceTimestamp,
  priceLoading,
  onManualPrice,
}: GoldSilverStepProps) {
  const madhab = MADHAB_CONFIGS[madhabId];
  const handleChange = (key: keyof GoldSilverAssets, value: number) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-4">
      <PriceDisplay
        goldPrice={goldPrice}
        silverPrice={silverPrice}
        source={priceSource}
        timestamp={priceTimestamp}
        isLoading={priceLoading}
        onManualClick={onManualPrice}
      />

      <Card icon="✨" title="সোনা ও রূপা">
        {!madhab.wornJewelryZakatable && (
          <div className="bg-blue-50 rounded-xl p-3 mb-4 text-xs text-blue-700">
            📌 {madhab.nameBn} মতে ব্যবহৃত গহনায় যাকাত ফরজ নয়। তবে বিনিয়োগের সোনা/রূপায় যাকাত দিতে হবে।
          </div>
        )}
        {madhab.wornJewelryZakatable && (
          <div className="bg-amber-50 rounded-xl p-3 mb-4 text-xs text-amber-700">
            📌 {madhab.nameBn} মতে সকল সোনা ও রূপায় (গহনা সহ) যাকাত ফরজ।
          </div>
        )}
        {GOLD_SILVER_CATEGORIES.map(cat => {
          const isJewelry = cat.id.includes('Jewelry');
          const isExempt = isJewelry && !madhab.wornJewelryZakatable;
          return (
            <div key={cat.id} className={isExempt ? 'opacity-50' : ''}>
              <InputField
                label={`${cat.labelBn}${isExempt ? ' (এই মাযহাবে অব্যাহতি)' : ''}`}
                description={cat.descriptionBn}
                value={data[cat.id as keyof GoldSilverAssets]}
                onChange={v => handleChange(cat.id as keyof GoldSilverAssets, v)}
                unit={cat.unit}
              />
            </div>
          );
        })}
      </Card>
    </div>
  );
}
