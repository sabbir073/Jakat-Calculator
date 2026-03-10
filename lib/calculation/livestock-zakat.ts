import { LivestockAssets } from '@/types/assets';
import { LivestockZakatResult, LivestockZakatItem } from '@/types/calculation';
import {
  calculateSheepGoatZakat,
  calculateCattleZakat,
  calculateCamelZakat,
} from '@/lib/constants/livestock-tables';

export function calculateLivestockZakat(
  livestock: LivestockAssets
): LivestockZakatResult {
  if (!livestock.enabled) {
    return { enabled: false, items: [] };
  }

  const items: LivestockZakatItem[] = [];

  if (livestock.sheepGoats > 0) {
    items.push({
      animalType: 'sheep_goat',
      animalTypeBn: 'ছাগল/ভেড়া',
      count: livestock.sheepGoats,
      zakatDescription: '',
      zakatDescriptionBn: calculateSheepGoatZakat(livestock.sheepGoats),
    });
  }

  if (livestock.cattle > 0) {
    items.push({
      animalType: 'cattle',
      animalTypeBn: 'গরু/মহিষ',
      count: livestock.cattle,
      zakatDescription: '',
      zakatDescriptionBn: calculateCattleZakat(livestock.cattle),
    });
  }

  if (livestock.camels > 0) {
    items.push({
      animalType: 'camel',
      animalTypeBn: 'উট',
      count: livestock.camels,
      zakatDescription: '',
      zakatDescriptionBn: calculateCamelZakat(livestock.camels),
    });
  }

  return { enabled: items.length > 0, items };
}
