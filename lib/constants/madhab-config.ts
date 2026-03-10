import { MadhabConfig, MadhabId } from '@/types/madhab';

export const MADHAB_CONFIGS: Record<MadhabId, MadhabConfig> = {
  hanafi: {
    id: 'hanafi',
    nameBn: 'হানাফি',
    nameEn: 'Hanafi',
    nisabStandard: 'silver',
    goldNisabGrams: 87.48,
    silverNisabGrams: 612.36,
    wornJewelryZakatable: true,
    description: 'রূপার নিসাব ব্যবহার করে। ব্যবহৃত গহনায় যাকাত ফরজ।',
  },
  shafii: {
    id: 'shafii',
    nameBn: 'শাফেয়ী',
    nameEn: "Shafi'i",
    nisabStandard: 'gold',
    goldNisabGrams: 87.48,
    silverNisabGrams: 612.36,
    wornJewelryZakatable: false,
    description: 'সোনার নিসাব ব্যবহার করে। ব্যবহৃত গহনায় যাকাত নেই।',
  },
  maliki: {
    id: 'maliki',
    nameBn: 'মালেকি',
    nameEn: 'Maliki',
    nisabStandard: 'gold',
    goldNisabGrams: 85,
    silverNisabGrams: 595,
    wornJewelryZakatable: false,
    description: 'সোনার নিসাব ব্যবহার করে। ব্যবহৃত গহনায় যাকাত নেই।',
  },
  hanbali: {
    id: 'hanbali',
    nameBn: 'হাম্বলি',
    nameEn: 'Hanbali',
    nisabStandard: 'gold',
    goldNisabGrams: 85,
    silverNisabGrams: 595,
    wornJewelryZakatable: false,
    description: 'সোনার নিসাব ব্যবহার করে। ব্যবহৃত গহনায় যাকাত নেই (ব্যবসার উদ্দেশ্যে না হলে)।',
  },
  ahle_hadith: {
    id: 'ahle_hadith',
    nameBn: 'আহলে হাদিস',
    nameEn: 'Ahle Hadith',
    nisabStandard: 'silver',
    goldNisabGrams: 85,
    silverNisabGrams: 595,
    wornJewelryZakatable: true,
    description: 'রূপার নিসাব ব্যবহার করে। হাদিস ভিত্তিক — ব্যবহৃত গহনায় যাকাত ফরজ।',
  },
};

export const MADHAB_LIST = Object.values(MADHAB_CONFIGS);
