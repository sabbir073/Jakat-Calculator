export interface AssetBreakdownItem {
  labelBn: string;
  valueBDT: number;
  zakatAmount: number;
  rate: number;
  included: boolean;
  note?: string;
}

export interface WealthZakatResult {
  totalAssets: number;
  totalDeductions: number;
  netAssets: number;
  nisabBDT: number;
  nisabStandard: 'gold' | 'silver';
  meetsNisab: boolean;
  zakatDue: number;
  breakdown: AssetBreakdownItem[];
}

export interface AgriculturalZakatResult {
  enabled: boolean;
  cropWeightKg: number;
  meetsNisab: boolean;
  nisabKg: number;
  irrigationType: string;
  rate: number;
  zakatDue: number;
}

export interface LivestockZakatItem {
  animalType: string;
  animalTypeBn: string;
  count: number;
  zakatDescription: string;
  zakatDescriptionBn: string;
}

export interface LivestockZakatResult {
  enabled: boolean;
  items: LivestockZakatItem[];
}

export interface RikazZakatResult {
  enabled: boolean;
  valueBDT: number;
  rate: number;
  zakatDue: number;
}

export interface ZakatReport {
  madhabId: string;
  madhabNameBn: string;
  hawlMet: boolean;
  wealth: WealthZakatResult;
  agriculture: AgriculturalZakatResult;
  livestock: LivestockZakatResult;
  rikaz: RikazZakatResult;
  totalMonetaryZakat: number;
}
