import { ZAKAT_RECIPIENTS } from '@/lib/constants/recipients';
import Card from '@/components/ui/Card';

export default function RecipientsPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-primary-800 text-center mb-2">
        🤲 যাকাত প্রাপকগণ
      </h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        পবিত্র কুরআনে (সূরা আত-তাওবা ৯:৬০) আল্লাহ তাআলা ৮ শ্রেণির মানুষকে যাকাত প্রাপক হিসেবে নির্ধারণ করেছেন।
      </p>

      <div className="space-y-3">
        {ZAKAT_RECIPIENTS.map(r => (
          <Card key={r.id}>
            <div className="flex items-start gap-3">
              <span className="text-3xl mt-1">{r.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {r.id}
                  </span>
                  <h3 className="font-bold text-gray-800 text-sm">{r.nameBn}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-1">
                  {r.arabicName} — {r.nameEn}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {r.descriptionBn}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quranic reference */}
      <div className="bg-primary-50 rounded-2xl p-5 mt-6 border border-primary-100">
        <p className="text-sm text-primary-800 text-center italic leading-relaxed">
          &ldquo;যাকাত শুধু ফকির, মিসকিন, যাকাত সংগ্রহকারী, মন জয় করতে, দাস মুক্তিতে, ঋণগ্রস্তদের জন্য, আল্লাহর পথে এবং মুসাফিরদের জন্য। এটা আল্লাহর পক্ষ থেকে ফরয। আল্লাহ সর্বজ্ঞ, মহাজ্ঞানী।&rdquo;
        </p>
        <p className="text-xs text-primary-600 text-center mt-2">
          — সূরা আত-তাওবা ৯:৬০
        </p>
      </div>
    </div>
  );
}
