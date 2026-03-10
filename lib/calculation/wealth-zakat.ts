import { MadhabConfig } from '@/types/madhab';
import { CashAssets, GoldSilverAssets, InvestmentAssets, BusinessAssets } from '@/types/assets';
import { WealthZakatResult, AssetBreakdownItem } from '@/types/calculation';

export interface MetalPrices {
  goldPerGramBDT: number;
  silverPerGramBDT: number;
}

export function calculateWealthZakat(
  madhab: MadhabConfig,
  hawlMet: boolean,
  cash: CashAssets,
  goldSilver: GoldSilverAssets,
  investments: InvestmentAssets,
  business: BusinessAssets,
  debt: number,
  prices: MetalPrices
): WealthZakatResult {
  const breakdown: AssetBreakdownItem[] = [];

  // Cash assets
  const cashItems = [
    { label: 'নগদ টাকা', value: cash.cash },
    { label: 'ব্যাংক ব্যালেন্স', value: cash.bankBalance },
    { label: 'প্রাপ্য অর্থ', value: cash.receivables },
    { label: 'স্থায়ী আমানত / FDR', value: cash.fdr },
  ];
  cashItems.forEach(item => {
    breakdown.push({
      labelBn: item.label,
      valueBDT: item.value,
      zakatAmount: 0,
      rate: 0.025,
      included: true,
    });
  });

  // Gold
  const goldInvestmentBDT = goldSilver.goldInvestmentGrams * prices.goldPerGramBDT;
  breakdown.push({
    labelBn: 'সোনা — বিনিয়োগ',
    valueBDT: goldInvestmentBDT,
    zakatAmount: 0,
    rate: 0.025,
    included: true,
    note: `${goldSilver.goldInvestmentGrams} গ্রাম × ৳${Math.round(prices.goldPerGramBDT)}`,
  });

  const goldJewelryBDT = goldSilver.goldJewelryGrams * prices.goldPerGramBDT;
  const goldJewelryIncluded = madhab.wornJewelryZakatable;
  breakdown.push({
    labelBn: 'সোনা — গহনা',
    valueBDT: goldJewelryBDT,
    zakatAmount: 0,
    rate: 0.025,
    included: goldJewelryIncluded,
    note: goldJewelryIncluded
      ? `${madhab.nameBn} মতে গহনায় যাকাত ফরজ`
      : `${madhab.nameBn} মতে ব্যবহৃত গহনায় যাকাত নেই`,
  });

  // Silver
  const silverInvestmentBDT = goldSilver.silverInvestmentGrams * prices.silverPerGramBDT;
  breakdown.push({
    labelBn: 'রূপা — বিনিয়োগ',
    valueBDT: silverInvestmentBDT,
    zakatAmount: 0,
    rate: 0.025,
    included: true,
    note: `${goldSilver.silverInvestmentGrams} গ্রাম × ৳${Math.round(prices.silverPerGramBDT)}`,
  });

  const silverJewelryBDT = goldSilver.silverJewelryGrams * prices.silverPerGramBDT;
  const silverJewelryIncluded = madhab.wornJewelryZakatable;
  breakdown.push({
    labelBn: 'রূপা — গহনা',
    valueBDT: silverJewelryBDT,
    zakatAmount: 0,
    rate: 0.025,
    included: silverJewelryIncluded,
    note: silverJewelryIncluded
      ? `${madhab.nameBn} মতে গহনায় যাকাত ফরজ`
      : `${madhab.nameBn} মতে ব্যবহৃত গহনায় যাকাত নেই`,
  });

  // Investments
  const investItems = [
    { label: 'স্টক ও শেয়ার', value: investments.stocks },
    { label: 'মিউচুয়াল ফান্ড', value: investments.mutualFunds },
    { label: 'ক্রিপ্টোকারেন্সি', value: investments.crypto },
    { label: 'প্রভিডেন্ট ফান্ড', value: investments.providentFund },
  ];
  investItems.forEach(item => {
    breakdown.push({
      labelBn: item.label,
      valueBDT: item.value,
      zakatAmount: 0,
      rate: 0.025,
      included: true,
    });
  });

  // Business
  const businessItems = [
    { label: 'ব্যবসায়িক পণ্য', value: business.businessInventory },
    { label: 'ভাড়া থেকে সঞ্চয়', value: business.rentalIncome },
  ];
  businessItems.forEach(item => {
    breakdown.push({
      labelBn: item.label,
      valueBDT: item.value,
      zakatAmount: 0,
      rate: 0.025,
      included: true,
    });
  });

  // Calculate totals
  const totalAssets = breakdown
    .filter(b => b.included)
    .reduce((sum, b) => sum + b.valueBDT, 0);

  const netAssets = totalAssets - debt;

  // Calculate nisab
  let nisabBDT: number;
  if (madhab.nisabStandard === 'gold') {
    nisabBDT = madhab.goldNisabGrams * prices.goldPerGramBDT;
  } else {
    nisabBDT = madhab.silverNisabGrams * prices.silverPerGramBDT;
  }

  const meetsNisab = netAssets >= nisabBDT;
  let zakatDue = 0;

  if (hawlMet && meetsNisab) {
    zakatDue = netAssets * 0.025;
    // Update breakdown with individual zakat amounts
    breakdown.forEach(item => {
      if (item.included) {
        item.zakatAmount = item.valueBDT * 0.025;
      }
    });
  }

  return {
    totalAssets,
    totalDeductions: debt,
    netAssets,
    nisabBDT,
    nisabStandard: madhab.nisabStandard,
    meetsNisab,
    zakatDue,
    breakdown,
  };
}
