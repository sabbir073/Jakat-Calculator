import { RikazAssets } from '@/types/assets';
import { RikazZakatResult } from '@/types/calculation';

const RIKAZ_RATE = 0.20; // 20% - one fifth (khums)

export function calculateRikazZakat(rikaz: RikazAssets): RikazZakatResult {
  if (!rikaz.enabled || rikaz.valueBDT <= 0) {
    return {
      enabled: false,
      valueBDT: 0,
      rate: RIKAZ_RATE,
      zakatDue: 0,
    };
  }

  return {
    enabled: true,
    valueBDT: rikaz.valueBDT,
    rate: RIKAZ_RATE,
    zakatDue: rikaz.valueBDT * RIKAZ_RATE,
  };
}
