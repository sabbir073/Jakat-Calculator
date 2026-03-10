import { NextResponse } from 'next/server';

const TROY_OZ_TO_GRAMS = 31.1035;
const FALLBACK_GOLD_PER_GRAM_BDT = 12500;
const FALLBACK_SILVER_PER_GRAM_BDT = 155;

// Primary: gold-api.com (FREE, unlimited, no API key)
// Returns USD per troy ounce for XAU and XAG
async function fetchFromGoldApiCom(): Promise<{ gold: number; silver: number } | null> {
  try {
    const [goldRes, silverRes, fxRes] = await Promise.all([
      fetch('https://api.gold-api.com/price/XAU', { next: { revalidate: 3600 } }),
      fetch('https://api.gold-api.com/price/XAG', { next: { revalidate: 3600 } }),
      fetch('https://api.exchangerate-api.com/v4/latest/USD', { next: { revalidate: 3600 } }),
    ]);

    if (goldRes.ok && silverRes.ok && fxRes.ok) {
      const goldData = await goldRes.json();
      const silverData = await silverRes.json();
      const fxData = await fxRes.json();

      const usdToBdt = fxData.rates?.BDT;
      if (!usdToBdt || !goldData.price || !silverData.price) return null;

      return {
        gold: (goldData.price / TROY_OZ_TO_GRAMS) * usdToBdt,
        silver: (silverData.price / TROY_OZ_TO_GRAMS) * usdToBdt,
      };
    }
  } catch {
    // fall through
  }
  return null;
}

// Secondary: metals.live (FREE, no API key)
async function fetchFromMetalsLive(): Promise<{ gold: number; silver: number } | null> {
  try {
    const [metalRes, fxRes] = await Promise.all([
      fetch('https://api.metals.live/v1/spot', { next: { revalidate: 3600 } }),
      fetch('https://api.exchangerate-api.com/v4/latest/USD', { next: { revalidate: 3600 } }),
    ]);

    if (metalRes.ok && fxRes.ok) {
      const metalData = await metalRes.json();
      const fxData = await fxRes.json();

      const usdToBdt = fxData.rates?.BDT;
      const goldUsdPerOz = metalData[0]?.gold;
      const silverUsdPerOz = metalData[1]?.silver;

      if (!usdToBdt || !goldUsdPerOz || !silverUsdPerOz) return null;

      return {
        gold: (goldUsdPerOz / TROY_OZ_TO_GRAMS) * usdToBdt,
        silver: (silverUsdPerOz / TROY_OZ_TO_GRAMS) * usdToBdt,
      };
    }
  } catch {
    // fall through
  }
  return null;
}

export async function GET() {
  // Try free unlimited APIs in sequence
  let prices = await fetchFromGoldApiCom();
  let source = 'gold-api.com + exchangerate-api';

  if (!prices) {
    prices = await fetchFromMetalsLive();
    source = 'metals.live + exchangerate-api';
  }

  if (!prices) {
    prices = { gold: FALLBACK_GOLD_PER_GRAM_BDT, silver: FALLBACK_SILVER_PER_GRAM_BDT };
    source = 'fallback';
  }

  return NextResponse.json({
    goldPerGramBDT: Math.round(prices.gold * 100) / 100,
    silverPerGramBDT: Math.round(prices.silver * 100) / 100,
    source,
    timestamp: new Date().toISOString(),
  });
}
