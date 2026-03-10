'use client';

interface InputFieldProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  description,
  value,
  onChange,
  unit = '৳',
  placeholder = '0',
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
      </label>
      <p className="text-xs text-gray-500 mb-2">({description})</p>
      <div className="relative">
        {unit && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {unit}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          value={value || ''}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder}
          className={`w-full h-12 rounded-xl border border-gray-200 bg-white text-right pr-4 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition ${
            unit ? 'pl-10' : 'pl-4'
          }`}
        />
      </div>
    </div>
  );
}
