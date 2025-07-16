"use client";
import { memo } from "react";
import { useQuizLogic } from "./hooks/useQuizLogic";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import ThemeToggle from "@/components/theme";
import SignInButton from "@/app/[locale]/sign-in/sign-in-button";
import ProgressBar from "./ProgressBar";
import QuizOptions from "./QuizOptions";
import { formatTime } from "./utils/formatTime";

interface PageData {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const QuizTable = ({ data, size }: { data: PageData; size: number }) => {
  const {
    selected,
    setSelected,
    isSubmitted,
    timeLeft,
    handleSubmit,
    goToNext,
  } = useQuizLogic(data, size);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-xl bg-white/85 rounded-3xl shadow-2xl p-8 pb-5 text-[14px] sm:text-base">
        <ProgressBar current={data.id} total={size} />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-4 sm:mb-6 text-center animate-fade-in">
          {data.question}
        </h2>

        <form onSubmit={handleSubmit}>
          <QuizOptions
            options={data.options}
            selected={selected}
            correct={data.answer}
            isSubmitted={isSubmitted}
            onSelect={setSelected}
          />

          {!isSubmitted ? (
            <>
              <div className="text-center my-3 text-red-600 font-semibold text-lg animate-pulse">
                <span style={{ unicodeBidi: "plaintext" }}>
                  {formatTime(timeLeft)} ثانیه باقی مانده ⏳
                </span>
              </div>

              <button
                type="submit"
                disabled={!selected}
                className="w-full py-3 bg-blue-600 text-white text-lg sm:text-xl font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
              >
                ثبت پاسخ
              </button>
              <div className="text-sm sm:text-base text-gray-500 mt-3 mx-2 text-right">
                سؤال {data.id} از {size}
              </div>
            </>
          ) : (
            <div className="mt-6 mb-4 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-lg font-semibold gap-4">
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

export default memo(QuizTable);
