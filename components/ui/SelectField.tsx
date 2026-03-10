'use client';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export default function SelectField({
  label,
  description,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
      </label>
      {description && (
        <p className="text-xs text-gray-500 mb-2">({description})</p>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition appearance-none cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
