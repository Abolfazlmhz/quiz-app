"use client";
import { PageData } from "@/src/app/[locale]/data/[id]/types";
import ThemeToggle from "@/components/theme";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "./languageSwitcher";

const QuizTable = ({ data, size }: { data: PageData; size: number }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const answered: number[] = JSON.parse(
      localStorage.getItem("answered") || "[]"
    );
    if (!answered.includes(data.id)) {
      if (selected === data.answer) {
        const prev = parseInt(localStorage.getItem("correct") || "0", 10);
        localStorage.setItem("correct", (prev + 1).toString());
      }
      localStorage.setItem("answered", JSON.stringify([...answered, data.id]));
    }
    setIsSubmitted(true);
  };

  const goToNext = () => {
    const nextId = data.id + 1;
    const isLastQuestion = data.id === size;

    if (isLastQuestion) {
      const correct = localStorage.getItem("correct") || "0";
      router.push(`/result?correct=${correct}&size=${size}`);
    } else {
      localStorage.setItem("quizIdx", nextId.toString());
      router.push(`/data/${nextId}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 overflow-hidden sm:overflow-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 text-[14px] sm:text-base">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center leading-snug">
          {data.question}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 sm:space-y-4">
            {data.options.map((opt: string, index: number) => (
              <label
                key={index}
                className={`flex items-center p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition text-base sm:text-lg font-semibold
              ${
                isSubmitted
                  ? opt === data.answer
                    ? "border-green-600 bg-green-100 text-green-900"
                    : opt === selected
                    ? "border-red-600 bg-red-100 text-red-900"
                    : "border-gray-300 bg-white text-gray-900"
                  : selected === opt
                  ? "border-blue-600 bg-blue-100 text-blue-900 shadow-md"
                  : "border-gray-300 bg-white text-gray-900 hover:border-blue-500 hover:bg-blue-50"
              }
            `}
              >
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  disabled={isSubmitted}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                  className="form-radio accent-blue-600 ml-4 scale-110"
                />
                {opt}
              </label>
            ))}
          </div>

          {!isSubmitted ? (
            <button
              type="submit"
              disabled={!selected}
              className="mt-6 sm:mt-8 w-full py-2 sm:py-3 bg-blue-600 text-white text-lg sm:text-xl font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer"
            >
              ثبت پاسخ
            </button>
          ) : (
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-between items-center text-base sm:text-xl font-semibold gap-3">
              <p>
                {selected === data.answer ? (
                  <span className="text-green-700">✅ پاسخ درست است!</span>
                ) : (
                  <span className="text-red-600">
                    ❌ پاسخ اشتباه است. پاسخ صحیح: {data.answer}
                  </span>
                )}
              </p>
              <button
                onClick={goToNext}
                className="text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
              >
                {data.id === size ? "مشاهده نتیجه" : "سؤال بعدی"}
              </button>
            </div>
          )}
        </form>
      </div>
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
};

export default QuizTable;
