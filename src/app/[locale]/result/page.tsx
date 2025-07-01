"use client";

import ThemeToggle from "@/components/theme";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignInButton from "../sign-in/sign-in-button";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const TOTAL_QUESTIONS = 10;

const Result = () => {
  const router = useRouter();
  const [correct, setCorrect] = useState<number | null>(null);
  const { status } = useSession();
  const t = useTranslations("ResultPage");
  useEffect(() => {
    const correctLS = localStorage.getItem("correct");
    const answeredLS = localStorage.getItem("answered");

    const correctNum = parseInt(correctLS || "0", 10);
    const answered = answeredLS ? JSON.parse(answeredLS) : [];

    if (
      !correctLS ||
      !answeredLS ||
      isNaN(correctNum) ||
      !Array.isArray(answered) ||
      answered.length !== TOTAL_QUESTIONS ||
      status === "unauthenticated"
    ) {
      router.push("/");
      return;
    }

    setCorrect(correctNum);
  }, []);

  const handleTryAgain = () => {
    localStorage.removeItem("quizIdx");
    localStorage.removeItem("correct");
    localStorage.removeItem("answered");
    router.push("/");
  };

  if (correct === null) return null;

  const incorrect = TOTAL_QUESTIONS - correct;
  const percent = Math.round((correct / TOTAL_QUESTIONS) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-white rounded-3xl p-8 sm:p-10 max-w-xl w-full shadow-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 text-base sm:text-lg font-medium text-gray-800 mb-6">
          <div className="bg-green-100 rounded-xl py-3">
            {t("correct")}: {correct}
          </div>
          <div className="bg-red-100 rounded-xl py-3">
            {t("incorrect")}: {incorrect}
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-lg sm:text-xl font-semibold text-blue-800 mb-6">
          {t("percent")}: {t("percentValue")} %{percent}
        </p>

        <button
          onClick={handleTryAgain}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 font-medium text-sm sm:text-base transition"
        >
          {t("startAgain")}
        </button>
      </div>
      <SignInButton />
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
};

export default Result;
