import { memo } from "react";
interface Props {
  options: string[];
  selected: string | null;
  correct: string;
  isSubmitted: boolean;
  onSelect: (val: string) => void;
}

function QuizOptions({
  options,
  selected,
  correct,
  isSubmitted,
  onSelect,
}: Props) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {options.map((opt, i) => {
        const isCorrect = opt === correct;
        const isSelected = opt === selected;
        const base =
          "flex items-center p-3 sm:p-4 border-2 rounded-xl transition cursor-pointer font-medium";
        const className = isSubmitted
          ? isCorrect
            ? `${base} border-green-600 bg-green-50 text-green-800`
            : isSelected
            ? `${base} border-red-600 bg-red-50 text-red-800`
            : `${base} border-gray-300 text-gray-800`
          : isSelected
          ? `${base} border-blue-600 bg-blue-50 text-blue-800 shadow-md`
          : `${base} border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-800`;

        return (
          <label key={i} className={className}>
            <input
              type="radio"
              name="option"
              value={opt}
              disabled={isSubmitted}
              checked={isSelected}
              onChange={() => onSelect(opt)}
              className="form-radio accent-blue-600 mr-4 ml-2 scale-110"
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}
export default memo(QuizOptions);
