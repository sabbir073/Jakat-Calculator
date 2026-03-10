import { LivestockZakatTier } from '@/types/livestock';

export const SHEEP_GOAT_TABLE: LivestockZakatTier[] = [
  { min: 1, max: 39, zakatEn: 'No zakat', zakatBn: 'যাকাত নেই' },
  { min: 40, max: 120, zakatEn: '1 sheep/goat', zakatBn: '১টি ছাগল/ভেড়া' },
  { min: 121, max: 200, zakatEn: '2 sheep/goats', zakatBn: '২টি ছাগল/ভেড়া' },
  { min: 201, max: 300, zakatEn: '3 sheep/goats', zakatBn: '৩টি ছাগল/ভেড়া' },
];

export const CATTLE_TABLE: LivestockZakatTier[] = [
  { min: 1, max: 29, zakatEn: 'No zakat', zakatBn: 'যাকাত নেই' },
  { min: 30, max: 39, zakatEn: '1 tabi (1-year-old calf)', zakatBn: '১টি তাবি (১ বছরের বাছুর)' },
  { min: 40, max: 59, zakatEn: '1 musinnah (2-year-old cow)', zakatBn: '১টি মুসিন্নাহ (২ বছরের গরু)' },
  { min: 60, max: 69, zakatEn: '2 tabi', zakatBn: '২টি তাবি (১ বছরের বাছুর)' },
  { min: 70, max: 79, zakatEn: '1 tabi + 1 musinnah', zakatBn: '১টি তাবি + ১টি মুসিন্নাহ' },
  { min: 80, max: 89, zakatEn: '2 musinnah', zakatBn: '২টি মুসিন্নাহ' },
  { min: 90, max: 99, zakatEn: '3 tabi', zakatBn: '৩টি তাবি' },
  { min: 100, max: 109, zakatEn: '1 tabi + 2 musinnah', zakatBn: '১টি তাবি + ২টি মুসিন্নাহ' },
  { min: 110, max: 119, zakatEn: '2 tabi + 1 musinnah', zakatBn: '২টি তাবি + ১টি মুসিন্নাহ' },
  { min: 120, max: 129, zakatEn: '3 musinnah or 4 tabi', zakatBn: '৩টি মুসিন্নাহ অথবা ৪টি তাবি' },
];

export const CAMEL_TABLE: LivestockZakatTier[] = [
  { min: 1, max: 4, zakatEn: 'No zakat', zakatBn: 'যাকাত নেই' },
  { min: 5, max: 9, zakatEn: '1 sheep/goat', zakatBn: '১টি ছাগল/ভেড়া' },
  { min: 10, max: 14, zakatEn: '2 sheep/goats', zakatBn: '২টি ছাগল/ভেড়া' },
  { min: 15, max: 19, zakatEn: '3 sheep/goats', zakatBn: '৩টি ছাগল/ভেড়া' },
  { min: 20, max: 24, zakatEn: '4 sheep/goats', zakatBn: '৪টি ছাগল/ভেড়া' },
  { min: 25, max: 35, zakatEn: '1 bint makhad (1-year-old she-camel)', zakatBn: '১টি বিনতে মাখাদ (১ বছরের উটনি)' },
  { min: 36, max: 45, zakatEn: '1 bint labun (2-year-old she-camel)', zakatBn: '১টি বিনতে লাবুন (২ বছরের উটনি)' },
  { min: 46, max: 60, zakatEn: '1 hiqqah (3-year-old she-camel)', zakatBn: '১টি হিক্কাহ (৩ বছরের উটনি)' },
  { min: 61, max: 75, zakatEn: "1 jadh'ah (4-year-old she-camel)", zakatBn: '১টি জাযআহ (৪ বছরের উটনি)' },
  { min: 76, max: 90, zakatEn: '2 bint labun', zakatBn: '২টি বিনতে লাবুন' },
  { min: 91, max: 120, zakatEn: '2 hiqqah', zakatBn: '২টি হিক্কাহ' },
];

export function calculateSheepGoatZakat(count: number): string {
  if (count < 40) return 'যাকাত নেই';
  const tier = SHEEP_GOAT_TABLE.find(t => count >= t.min && count <= t.max);
  if (tier) return tier.zakatBn;
  // Above 300: 1 sheep per 100
  const zakatCount = Math.floor(count / 100);
  return `${toBengaliNum(zakatCount)}টি ছাগল/ভেড়া`;
}

export function calculateCattleZakat(count: number): string {
  if (count < 30) return 'যাকাত নেই';
  const tier = CATTLE_TABLE.find(t => count >= t.min && count <= t.max);
  if (tier) return tier.zakatBn;
  // Above 120: per 30 = 1 tabi, per 40 = 1 musinnah
  const tabi = Math.floor(count / 30);
  const musinnah = Math.floor(count / 40);
  // Find optimal combination
  let bestTabi = 0, bestMusinnah = 0;
  for (let m = 0; m <= musinnah; m++) {
    const remaining = count - (m * 40);
    if (remaining >= 0) {
      const t = Math.floor(remaining / 30);
      if (t * 30 + m * 40 >= count - 29) {
        if (t + m < bestTabi + bestMusinnah || bestTabi + bestMusinnah === 0) {
          bestTabi = t;
          bestMusinnah = m;
        }
      }
    }
  }
  if (bestTabi > 0 && bestMusinnah > 0) {
    return `${toBengaliNum(bestTabi)}টি তাবি + ${toBengaliNum(bestMusinnah)}টি মুসিন্নাহ`;
  }
  if (bestMusinnah > 0) return `${toBengaliNum(bestMusinnah)}টি মুসিন্নাহ`;
  return `${toBengaliNum(bestTabi)}টি তাবি`;
}

export function calculateCamelZakat(count: number): string {
  if (count < 5) return 'যাকাত নেই';
  const tier = CAMEL_TABLE.find(t => count >= t.min && count <= t.max);
  if (tier) return tier.zakatBn;
  // Above 120: per 40 = bint labun, per 50 = hiqqah
  let bestBL = 0, bestH = 0;
  for (let h = Math.floor(count / 50); h >= 0; h--) {
    const remaining = count - (h * 50);
    const bl = Math.floor(remaining / 40);
    if (bl * 40 + h * 50 >= count) {
      bestBL = bl;
      bestH = h;
      break;
    }
  }
  const parts: string[] = [];
  if (bestBL > 0) parts.push(`${toBengaliNum(bestBL)}টি বিনতে লাবুন`);
  if (bestH > 0) parts.push(`${toBengaliNum(bestH)}টি হিক্কাহ`);
  return parts.join(' + ') || 'যাকাত নেই';
}

function toBengaliNum(n: number): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return n.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
}
