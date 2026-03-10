export interface CashAssets {
  cash: number;
  bankBalance: number;
  receivables: number;
  fdr: number;
}

export interface GoldSilverAssets {
  goldInvestmentGrams: number;
  goldJewelryGrams: number;
  silverInvestmentGrams: number;
  silverJewelryGrams: number;
}

export interface InvestmentAssets {
  stocks: number;
  mutualFunds: number;
  crypto: number;
  providentFund: number;
}

export interface BusinessAssets {
  businessInventory: number;
  rentalIncome: number;
}

export interface AgriculturalAssets {
  enabled: boolean;
  cropWeightKg: number;
  irrigationType: 'natural' | 'irrigated' | 'mixed';
  cropValueBDT: number;
}

export interface LivestockAssets {
  enabled: boolean;
  camels: number;
  cattle: number;
  sheepGoats: number;
}

export interface RikazAssets {
  enabled: boolean;
  valueBDT: number;
}

export interface CalculatorInput {
  madhabId: string;
  hawlMet: boolean;
  cash: CashAssets;
  goldSilver: GoldSilverAssets;
  investments: InvestmentAssets;
  business: BusinessAssets;
  agriculture: AgriculturalAssets;
  livestock: LivestockAssets;
  rikaz: RikazAssets;
  debt: number;
}
