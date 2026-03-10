export interface AssetCategoryInfo {
  id: string;
  labelBn: string;
  descriptionBn: string;
  unit?: string;
}

export const CASH_CATEGORIES: AssetCategoryInfo[] = [
  {
    id: 'cash',
    labelBn: 'নগদ টাকা',
    descriptionBn: 'হাতে থাকা সকল নগদ অর্থ',
    unit: '৳',
  },
  {
    id: 'bankBalance',
    labelBn: 'ব্যাংক ব্যালেন্স',
    descriptionBn: 'সেভিংস, কারেন্ট, সকল অ্যাকাউন্টের মোট টাকা',
    unit: '৳',
  },
  {
    id: 'receivables',
    labelBn: 'প্রাপ্য অর্থ',
    descriptionBn: 'অন্যদের কাছে পাওনা টাকা যা ফেরত আসবে বলে আশা আছে',
    unit: '৳',
  },
  {
    id: 'fdr',
    labelBn: 'স্থায়ী আমানত / FDR',
    descriptionBn: 'ব্যাংকে জমানো স্থায়ী আমানত',
    unit: '৳',
  },
];

export const GOLD_SILVER_CATEGORIES: AssetCategoryInfo[] = [
  {
    id: 'goldInvestmentGrams',
    labelBn: 'সোনা — বিনিয়োগ',
    descriptionBn: 'সঞ্চয় বা বিনিয়োগের জন্য রাখা সোনা, গ্রামে',
    unit: 'গ্রাম',
  },
  {
    id: 'goldJewelryGrams',
    labelBn: 'সোনা — গহনা',
    descriptionBn: 'ব্যবহৃত সোনার গহনা, গ্রামে — মাযহাব অনুযায়ী প্রযোজ্য',
    unit: 'গ্রাম',
  },
  {
    id: 'silverInvestmentGrams',
    labelBn: 'রূপা — বিনিয়োগ',
    descriptionBn: 'সঞ্চয়ের জন্য রাখা রূপা, গ্রামে',
    unit: 'গ্রাম',
  },
  {
    id: 'silverJewelryGrams',
    labelBn: 'রূপা — গহনা',
    descriptionBn: 'ব্যবহৃত রূপার গহনা, গ্রামে',
    unit: 'গ্রাম',
  },
];

export const INVESTMENT_CATEGORIES: AssetCategoryInfo[] = [
  {
    id: 'stocks',
    labelBn: 'স্টক ও শেয়ার',
    descriptionBn: 'শেয়ার বাজারে বিনিয়োগের বর্তমান মূল্য',
    unit: '৳',
  },
  {
    id: 'mutualFunds',
    labelBn: 'মিউচুয়াল ফান্ড',
    descriptionBn: 'মিউচুয়াল ফান্ডে বিনিয়োগ',
    unit: '৳',
  },
  {
    id: 'crypto',
    labelBn: 'ক্রিপ্টোকারেন্সি',
    descriptionBn: 'বিটকয়েন, ইথেরিয়াম ইত্যাদির বর্তমান মূল্য',
    unit: '৳',
  },
  {
    id: 'providentFund',
    labelBn: 'প্রভিডেন্ট ফান্ড',
    descriptionBn: 'উত্তোলনযোগ্য প্রভিডেন্ট ফান্ডের পরিমাণ',
    unit: '৳',
  },
];

export const BUSINESS_CATEGORIES: AssetCategoryInfo[] = [
  {
    id: 'businessInventory',
    labelBn: 'ব্যবসায়িক পণ্য',
    descriptionBn: 'ব্যবসার মজুদ পণ্যের বর্তমান বাজারমূল্য',
    unit: '৳',
  },
  {
    id: 'rentalIncome',
    labelBn: 'ভাড়া থেকে সঞ্চয়',
    descriptionBn: 'ভাড়া আয় থেকে জমানো অর্থ',
    unit: '৳',
  },
];
