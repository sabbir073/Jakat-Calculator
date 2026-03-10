export interface PriceData {
  goldPerGramBDT: number;
  silverPerGramBDT: number;
  source: string;
  timestamp: string;
  isManual: boolean;
}

const CACHE_KEY = 'zakat_metal_prices';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

export async function fetchMetalPrices(): Promise<PriceData> {
  // Check cache first
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as PriceData;
      const age = Date.now() - new Date(parsed.timestamp).getTime();
      if (age < CACHE_TTL) {
        return parsed;
      }
    }
  }

  try {
    const res = await fetch('/api/prices');
    if (res.ok) {
      const data = await res.json();
      const priceData: PriceData = {
        goldPerGramBDT: data.goldPerGramBDT,
        silverPerGramBDT: data.silverPerGramBDT,
        source: data.source,
        timestamp: data.timestamp,
        isManual: false,
      };

      // Cache the result
      if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, JSON.stringify(priceData));
      }

      return priceData;
    }
  } catch {
    // Try to use stale cache
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as PriceData;
        return { ...parsed, source: 'cached (offline)' };
      }
    }
  }

  // Final fallback
  return {
    goldPerGramBDT: 12500,
    silverPerGramBDT: 155,
    source: 'fallback',
    timestamp: new Date().toISOString(),
    isManual: false,
  };
}
