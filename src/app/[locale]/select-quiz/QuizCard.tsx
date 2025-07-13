import React from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}

function QuizCardComponent({ icon, label, color, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl p-6 ${color} shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 text-center cursor-pointer`}
    >
      <div className="flex flex-col items-center gap-4">
        {icon}
        <span className="text-xl font-semibold text-gray-800">{label}</span>
      </div>
    </button>
  );
}

// استفاده از memo با نام مشخص
const QuizCard = React.memo(QuizCardComponent);

export default QuizCard;
