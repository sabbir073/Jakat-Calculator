'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MadhabId } from '@/types/madhab';
import {
  CashAssets,
  GoldSilverAssets,
  InvestmentAssets,
  BusinessAssets,
  AgriculturalAssets,
  LivestockAssets,
  RikazAssets,
  CalculatorInput,
} from '@/types/assets';
import { ZakatReport } from '@/types/calculation';
import { useMetalPrices } from '@/lib/hooks/useMetalPrices';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { calculateAllZakat } from '@/lib/calculation';
import StepIndicator from '@/components/ui/StepIndicator';
import MadhabSelector from './MadhabSelector';
import CashStep from './CashStep';
import GoldSilverStep from './GoldSilverStep';
import InvestmentStep from './InvestmentStep';
import BusinessStep from './BusinessStep';
import AgricultureStep from './AgricultureStep';
import LivestockStep from './LivestockStep';
import RikazStep from './RikazStep';
import DebtStep from './DebtStep';

const STEP_LABELS = [
  'মাযহাব নির্বাচন',
  'নগদ সম্পদ',
  'সোনা ও রূপা',
  'বিনিয়োগ',
  'ব্যবসা',
  'কৃষি',
  'পশুসম্পদ',
  'খনিজ',
  'ঋণ',
];

const TOTAL_STEPS = STEP_LABELS.length;

interface CalculatorWizardProps {
  onResult: (report: ZakatReport) => void;
}

export default function CalculatorWizard({ onResult }: CalculatorWizardProps) {
  const [step, setStep] = useState(0);
  const { prices, isLoading: priceLoading, setManualPrices } = useMetalPrices();
  const [showManualPrice, setShowManualPrice] = useState(false);

  const [madhabId, setMadhabId] = useLocalStorage<MadhabId>('zakat_madhab', 'hanafi');
  const [hawlMet, setHawlMet] = useLocalStorage('zakat_hawl', true);

  const [cashData, setCashData] = useLocalStorage<CashAssets>('zakat_cash', {
    cash: 0,
    bankBalance: 0,
    receivables: 0,
    fdr: 0,
  });

  const [goldSilverData, setGoldSilverData] = useLocalStorage<GoldSilverAssets>(
    'zakat_gold_silver',
    {
      goldInvestmentGrams: 0,
      goldJewelryGrams: 0,
      silverInvestmentGrams: 0,
      silverJewelryGrams: 0,
    }
  );

  const [investmentData, setInvestmentData] = useLocalStorage<InvestmentAssets>(
    'zakat_investments',
    {
      stocks: 0,
      mutualFunds: 0,
      crypto: 0,
      providentFund: 0,
    }
  );

  const [businessData, setBusinessData] = useLocalStorage<BusinessAssets>(
    'zakat_business',
    {
      businessInventory: 0,
      rentalIncome: 0,
    }
  );

  const [agricultureData, setAgricultureData] = useLocalStorage<AgriculturalAssets>(
    'zakat_agriculture',
    {
      enabled: false,
      cropWeightKg: 0,
      irrigationType: 'natural',
      cropValueBDT: 0,
    }
  );

  const [livestockData, setLivestockData] = useLocalStorage<LivestockAssets>(
    'zakat_livestock',
    {
      enabled: false,
      camels: 0,
      cattle: 0,
      sheepGoats: 0,
    }
  );

  const [rikazData, setRikazData] = useLocalStorage<RikazAssets>('zakat_rikaz', {
    enabled: false,
    valueBDT: 0,
  });

  const [debt, setDebt] = useLocalStorage('zakat_debt', 0);

  const handleCalculate = useCallback(() => {
    if (!prices) return;

    const input: CalculatorInput = {
      madhabId,
      hawlMet,
      cash: cashData,
      goldSilver: goldSilverData,
      investments: investmentData,
      business: businessData,
      agriculture: agricultureData,
      livestock: livestockData,
      rikaz: rikazData,
      debt,
    };

    const report = calculateAllZakat(input, {
      goldPerGramBDT: prices.goldPerGramBDT,
      silverPerGramBDT: prices.silverPerGramBDT,
    });

    onResult(report);
  }, [
    prices,
    madhabId,
    hawlMet,
    cashData,
    goldSilverData,
    investmentData,
    businessData,
    agricultureData,
    livestockData,
    rikazData,
    debt,
    onResult,
  ]);

  const nextStep = () => {
    if (step < TOTAL_STEPS - 1) setStep(s => s + 1);
    else handleCalculate();
  };

  const prevStep = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <MadhabSelector
            madhabId={madhabId}
            hawlMet={hawlMet}
            onMadhabChange={setMadhabId}
            onHawlChange={setHawlMet}
          />
        );
      case 1:
        return <CashStep data={cashData} onChange={setCashData} />;
      case 2:
        return (
          <GoldSilverStep
            data={goldSilverData}
            onChange={setGoldSilverData}
            madhabId={madhabId}
            goldPrice={prices?.goldPerGramBDT || 0}
            silverPrice={prices?.silverPerGramBDT || 0}
            priceSource={prices?.source || ''}
            priceTimestamp={prices?.timestamp || ''}
            priceLoading={priceLoading}
            onManualPrice={() => setShowManualPrice(true)}
          />
        );
      case 3:
        return <InvestmentStep data={investmentData} onChange={setInvestmentData} />;
      case 4:
        return <BusinessStep data={businessData} onChange={setBusinessData} />;
      case 5:
        return <AgricultureStep data={agricultureData} onChange={setAgricultureData} />;
      case 6:
        return <LivestockStep data={livestockData} onChange={setLivestockData} />;
      case 7:
        return <RikazStep data={rikazData} onChange={setRikazData} />;
      case 8:
        return <DebtStep debt={debt} onChange={setDebt} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      <StepIndicator
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        labels={STEP_LABELS}
      />

      <div className="mb-6">{renderStep()}</div>

      {/* Manual price modal */}
      {showManualPrice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-gray-800 mb-4">ম্যানুয়াল মূল্য দিন</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">সোনা (প্রতি গ্রাম BDT)</label>
                <input
                  type="number"
                  defaultValue={prices?.goldPerGramBDT || 12500}
                  id="manual-gold"
                  className="w-full h-10 border rounded-lg px-3 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">রূপা (প্রতি গ্রাম BDT)</label>
                <input
                  type="number"
                  defaultValue={prices?.silverPerGramBDT || 155}
                  id="manual-silver"
                  className="w-full h-10 border rounded-lg px-3 mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowManualPrice(false)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  const goldEl = document.getElementById('manual-gold') as HTMLInputElement;
                  const silverEl = document.getElementById('manual-silver') as HTMLInputElement;
                  setManualPrices(
                    parseFloat(goldEl.value) || 12500,
                    parseFloat(silverEl.value) || 155
                  );
                  setShowManualPrice(false);
                }}
                className="flex-1 py-2 rounded-lg bg-primary-600 text-white font-semibold"
              >
                সেভ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {step > 0 && (
          <button
            onClick={prevStep}
            className="flex-1 h-12 rounded-xl border-2 border-primary-200 text-primary-600 font-bold text-sm transition-all hover:bg-primary-50"
          >
            ← পূর্ববর্তী
          </button>
        )}
        <button
          onClick={nextStep}
          className={`flex-1 h-12 rounded-xl font-bold text-sm transition-all shadow-lg ${
            step === TOTAL_STEPS - 1
              ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {step === TOTAL_STEPS - 1 ? '🧮 যাকাত হিসাব করুন' : 'পরবর্তী →'}
        </button>
      </div>
    </div>
  );
}
