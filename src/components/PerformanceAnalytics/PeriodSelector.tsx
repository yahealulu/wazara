
interface PeriodSelectorProps {
  selected: string;
  onChange: (period: string) => void;
  options: string[];
}

export default function PeriodSelector({ selected, onChange, options }: PeriodSelectorProps) {

  return (
    <div className="flex items-center gap-3">
      <p className="text-sm text-[#737373]">{"View By"}</p>
      <div className="flex items-center gap-2">
        {options?.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-3 py-1.5 rounded-xl text-sm transition-all ${
              selected === option
                ? "bg-Primary text-white"
                : "hover:bg-gray-200 border border-borderColor"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}