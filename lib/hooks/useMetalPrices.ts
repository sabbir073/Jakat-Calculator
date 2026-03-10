'use client';

import { useState, useEffect, useCallback } from 'react';
import { PriceData, fetchMetalPrices } from '@/lib/api/metal-prices';

export function useMetalPrices() {
  const [prices, setPrices] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isManual, setIsManual] = useState(false);

  const loadPrices = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchMetalPrices();
    setPrices(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPrices();
  }, [loadPrices]);

  const setManualPrices = useCallback((gold: number, silver: number) => {
    setPrices({
      goldPerGramBDT: gold,
      silverPerGramBDT: silver,
      source: 'manual',
      timestamp: new Date().toISOString(),
      isManual: true,
    });
    setIsManual(true);
  }, []);

  return {
    prices,
    isLoading,
    isManual,
    setManualPrices,
    refetch: loadPrices,
  };
}
