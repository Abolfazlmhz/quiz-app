"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuizIdx, incrementCorrect, addAnswered } from "@/store/quizSlice";
import { RootState } from "@/store";
import ThemeToggle from "@/components/theme";
import LanguageSwitcher from "./languageSwitcher";
import SignInButton from "@/app/[locale]/sign-in/sign-in-button";

interface PageData {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const QuizTable = ({ data, size }: { data: PageData; size: number }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const answered = useSelector((state: RootState) => state.quiz.answered);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!answered.includes(data.id)) {
      if (selected === data.answer) {
        dispatch(incrementCorrect());
      }
      dispatch(addAnswered(data.id));
    }
    setIsSubmitted(true);
  };

  const goToNext = () => {
    const nextId = data.id + 1;
    if (nextId > size) {
      router.push("/result");
    } else {
      dispatch(setQuizIdx(nextId));
      router.push(`/data/${nextId}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 overflow-hidden">
      <div className="relative w-full max-w-xl bg-white/85 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 text-[14px] sm:text-base">
        <div className="absolute top-0 w-10/12 h-2 bg-gray-200 rounded-t-3xl overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${(data.id / size) * 100}%` }}
          />
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-4 sm:mb-6 text-center animate-fade-in">
          {data.question}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3 sm:space-y-4">
            {data.options.map((opt, index) => (
              <label
                key={index}
                className={`flex items-center p-3 sm:p-4 border-2 rounded-xl transition cursor-pointer font-medium
              ${
                isSubmitted
                  ? opt === data.answer
                    ? "border-green-600 bg-green-50 text-green-800"
                    : opt === selected
                    ? "border-red-600 bg-red-50 text-red-800"
                    : "border-gray-300 text-gray-800"
                  : selected === opt
                  ? "border-blue-600 bg-blue-50 text-blue-800 shadow-md"
                  : "border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-800"
              }`}
              >
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  disabled={isSubmitted}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                  className="form-radio accent-blue-600 mr-4 ml-2 scale-110"
                />
                {opt}
              </label>
            ))}
          </div>

          {!isSubmitted ? (
            <>
              <button
                type="submit"
                disabled={!selected}
                className="mt-4 w-full py-3 bg-blue-600 text-white text-lg sm:text-xl font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
              >
                ثبت پاسخ
              </button>
              <div className="text-sm sm:text-base text-gray-500 mt-5 mr-2 ml-2 text-right">
                سؤال {data.id} از {size}
              </div>
            </>
          ) : (
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-lg font-semibold gap-4">
              <p>
                {selected === data.answer ? (
                  <span className="text-green-700">
                    ✅ آفرین! پاسخ درست بود
                  </span>
                ) : (
                  <span className="text-red-600">
                    ❌ متأسفانه اشتباه بود. جواب درست: <b>{data.answer}</b>
                  </span>
                )}
              </p>
              <button
                onClick={goToNext}
                className="text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
              >
                {data.id === size ? "مشاهده نتیجه" : "سؤال بعدی →"}
              </button>
            </div>
          )}
        </form>
      </div>

      <SignInButton />
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
};

export default QuizTable;
