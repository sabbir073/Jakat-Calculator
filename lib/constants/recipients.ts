export interface ZakatRecipient {
  id: number;
  arabicName: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  icon: string;
}

export const ZAKAT_RECIPIENTS: ZakatRecipient[] = [
  {
    id: 1,
    arabicName: 'الفقراء',
    nameBn: 'ফকির (আল-ফুকারা)',
    nameEn: 'The Poor (Al-Fuqara)',
    descriptionBn: 'অতি দরিদ্র যাদের জীবনযাত্রার মৌলিক চাহিদা পূরণের সামর্থ্য নেই। তারা অন্যদের কাছে সাহায্য চাইতেও পারে না।',
    icon: '🤲',
  },
  {
    id: 2,
    arabicName: 'المساكين',
    nameBn: 'মিসকিন (আল-মাসাকীন)',
    nameEn: 'The Needy (Al-Masakin)',
    descriptionBn: 'দরিদ্র যাদের কিছু আয় আছে কিন্তু তা দিয়ে প্রয়োজন পূরণ হয় না। ফকিরের চেয়ে সামান্য ভালো অবস্থায় আছে।',
    icon: '🏚️',
  },
  {
    id: 3,
    arabicName: 'العاملين عليها',
    nameBn: 'আমিলীন (যাকাত সংগ্রহকারী)',
    nameEn: 'Zakat Administrators (Amilin)',
    descriptionBn: 'যারা যাকাত সংগ্রহ, হিসাব ও বিতরণের কাজে নিযুক্ত। তারা ধনী হলেও এই কাজের জন্য যাকাত থেকে পারিশ্রমিক পেতে পারেন।',
    icon: '📋',
  },
  {
    id: 4,
    arabicName: 'المؤلفة قلوبهم',
    nameBn: 'মুআল্লাফাতুল কুলুব',
    nameEn: 'Those Whose Hearts Are Reconciled',
    descriptionBn: 'নতুন ইসলাম গ্রহণকারী অথবা যাদের হৃদয় ইসলামের প্রতি আকৃষ্ট করা প্রয়োজন। তাদের ঈমান মজবুত করতে সাহায্য করা হয়।',
    icon: '💚',
  },
  {
    id: 5,
    arabicName: 'في الرقاب',
    nameBn: 'ফির রিকাব (দাস মুক্তি)',
    nameEn: 'Freeing Captives (Fir-Riqab)',
    descriptionBn: 'দাসত্ব থেকে মুক্তি দেওয়া। আধুনিক সময়ে এটি মানব পাচার, বন্দী মুক্তি ও অন্যায় আটকের শিকারদের সাহায্যে প্রযোজ্য।',
    icon: '⛓️',
  },
  {
    id: 6,
    arabicName: 'الغارمين',
    nameBn: 'আল-গারিমীন (ঋণগ্রস্ত)',
    nameEn: 'The Debt-Ridden (Al-Gharimin)',
    descriptionBn: 'যারা জায়েজ প্রয়োজনে ঋণগ্রস্ত হয়ে পড়েছেন এবং ঋণ পরিশোধে অক্ষম। বিলাসিতার ঋণ এতে অন্তর্ভুক্ত নয়।',
    icon: '💰',
  },
  {
    id: 7,
    arabicName: 'في سبيل الله',
    nameBn: 'ফী সাবীলিল্লাহ (আল্লাহর পথে)',
    nameEn: "In Allah's Cause (Fi Sabilillah)",
    descriptionBn: 'আল্লাহর পথে কাজ করা — ইসলামী শিক্ষা, দাওয়াহ, জিহাদ ও কল্যাণমূলক কাজে নিয়োজিত ব্যক্তিরা।',
    icon: '🕌',
  },
  {
    id: 8,
    arabicName: 'ابن السبيل',
    nameBn: 'ইবনুস সাবীল (মুসাফির)',
    nameEn: 'The Stranded Traveler (Ibn Al-Sabil)',
    descriptionBn: 'বিপদগ্রস্ত মুসাফির যিনি সফরে আটকে পড়েছেন এবং ঘরে ফিরতে পারছেন না, যদিও তিনি নিজ দেশে সচ্ছল হতে পারেন।',
    icon: '🧳',
  },
];
