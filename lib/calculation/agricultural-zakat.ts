import { AgriculturalAssets } from '@/types/assets';
import { AgriculturalZakatResult } from '@/types/calculation';

const AGRICULTURE_NISAB_KG = 653; // 5 wasq

export function calculateAgriculturalZakat(
  agriculture: AgriculturalAssets
): AgriculturalZakatResult {
  if (!agriculture.enabled || agriculture.cropWeightKg <= 0) {
    return {
      enabled: false,
      cropWeightKg: 0,
      meetsNisab: false,
      nisabKg: AGRICULTURE_NISAB_KG,
      irrigationType: 'natural',
      rate: 0,
      zakatDue: 0,
    };
  }

  const meetsNisab = agriculture.cropWeightKg >= AGRICULTURE_NISAB_KG;

  let rate: number;
  switch (agriculture.irrigationType) {
    case 'natural':
      rate = 0.10; // 10% for rain-fed
      break;
    case 'irrigated':
      rate = 0.05; // 5% for artificially irrigated
      break;
    case 'mixed':
      rate = 0.075; // 7.5% for mixed
      break;
    default:
      rate = 0.10;
  }

  const zakatDue = meetsNisab ? agriculture.cropValueBDT * rate : 0;

  return {
    enabled: true,
    cropWeightKg: agriculture.cropWeightKg,
    meetsNisab,
    nisabKg: AGRICULTURE_NISAB_KG,
    irrigationType: agriculture.irrigationType,
    rate,
    zakatDue,
  };
}
