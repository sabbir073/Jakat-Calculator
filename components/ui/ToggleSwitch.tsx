'use client';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  description?: string;
}

export default function ToggleSwitch({ enabled, onChange, label, description }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4 cursor-pointer"
    >
      <div className="text-left">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        {description && <p className="text-xs text-gray-500">({description})</p>}
      </div>
      <div
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 flex-shrink-0 ml-3 ${
          enabled ? 'bg-primary-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
            enabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  );
}
