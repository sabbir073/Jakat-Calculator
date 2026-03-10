import { CalculatorInput } from '@/types/assets';
import { ZakatReport } from '@/types/calculation';
import { MADHAB_CONFIGS } from '@/lib/constants/madhab-config';
import { MadhabId } from '@/types/madhab';
import { calculateWealthZakat, MetalPrices } from './wealth-zakat';
import { calculateAgriculturalZakat } from './agricultural-zakat';
import { calculateLivestockZakat } from './livestock-zakat';
import { calculateRikazZakat } from './rikaz-zakat';

export function calculateAllZakat(
  input: CalculatorInput,
  prices: MetalPrices
): ZakatReport {
  const madhab = MADHAB_CONFIGS[input.madhabId as MadhabId];

  const wealth = calculateWealthZakat(
    madhab,
    input.hawlMet,
    input.cash,
    input.goldSilver,
    input.investments,
    input.business,
    input.debt,
    prices
  );

  const agriculture = calculateAgriculturalZakat(input.agriculture);
  const livestock = calculateLivestockZakat(input.livestock);
  const rikaz = calculateRikazZakat(input.rikaz);

  const totalMonetaryZakat =
    wealth.zakatDue + agriculture.zakatDue + rikaz.zakatDue;

  return {
    madhabId: madhab.id,
    madhabNameBn: madhab.nameBn,
    hawlMet: input.hawlMet,
    wealth,
    agriculture,
    livestock,
    rikaz,
    totalMonetaryZakat,
  };
}
