"use client";
import { ThemeToggle } from "@/components/theme";
import { useSearchParams, useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/data/languageSwitcher";

const Result = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const correct = parseInt(searchParams.get("correct") || "0", 10);
  const size = parseInt(searchParams.get("size") || "0", 10);
  const incorrect = size - correct;
  const percent = Math.round((correct / size) * 100);

  const handleTryAgain = () => {
    localStorage.removeItem("quizIdx");
    localStorage.removeItem("correct");
    localStorage.removeItem("answered");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl p-10 max-w-lg w-full shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          🎉 آزمون تمام شد!
        </h1>
        <p className="text-lg text-gray-600 mb-8">نتایج شما به شرح زیر است:</p>

        <div className="grid grid-cols-2 gap-6 text-xl font-semibold text-gray-700 mb-8">
          <div className="bg-green-100 rounded-xl py-4">✅ درست: {correct}</div>
          <div className="bg-red-100 rounded-xl py-4">❌ غلط: {incorrect}</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-5 mb-8">
          <div
            className="bg-blue-600 h-5 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-xl font-semibold text-blue-700 mb-8">
          درصد موفقیت: {percent}%
        </p>

        <button
          onClick={handleTryAgain}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 font-semibold transition"
        >
          شروع مجدد آزمون
        </button>
      </div>
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
};

export default Result;
