export type MadhabId = 'hanafi' | 'shafii' | 'maliki' | 'hanbali' | 'ahle_hadith';

export interface MadhabConfig {
  id: MadhabId;
  nameBn: string;
  nameEn: string;
  nisabStandard: 'gold' | 'silver';
  goldNisabGrams: number;
  silverNisabGrams: number;
  wornJewelryZakatable: boolean;
  description: string;
}
