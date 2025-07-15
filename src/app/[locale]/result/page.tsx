"use client";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import ThemeToggle from "@/components/theme";
import SignInButton from "../sign-in/sign-in-button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { resetQuiz, saveResult } from "@/store/quizSlice";
import { useCallback, useEffect, useMemo, useState } from "react";

const Result = () => {
  const router = useRouter();
  const { status } = useSession();
  const t = useTranslations("ResultPage");
  const correct = useSelector((state: RootState) => state.quiz.correct ?? 0);
  const answered = useSelector((state: RootState) => state.quiz.answered ?? []);
  const TOTAL_QUESTIONS = useSelector(
    (state: RootState) => state.quiz.size ?? 0
  );
  const dispatch = useDispatch();

  const incorrect = useMemo(
    () => TOTAL_QUESTIONS - correct || 0,
    [TOTAL_QUESTIONS, correct]
  );
  const percent = useMemo(() => {
    return TOTAL_QUESTIONS > 0
      ? Math.round((correct / TOTAL_QUESTIONS) * 100)
      : 0;
  }, [TOTAL_QUESTIONS, correct]);

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (answered.length !== TOTAL_QUESTIONS || status === "unauthenticated") {
      setIsValid(false);
      router.push("/");
    }
  }, [answered.length, TOTAL_QUESTIONS, status, router, dispatch]);

  const handleTryAgain = useCallback(() => {
    dispatch(saveResult());
    dispatch(resetQuiz());
    router.push("/");
  }, [dispatch, router]);

  if (!isValid) return null;

  return (
    <div className=" min-h-screen flex items-center justify-center px-4 py-4">
      <div className="bg-white/85 rounded-3xl shadow-2xl p-6 max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-5">
          {t("title")}
        </h1>
        <p
          className={`text-xl font-bold mb-4 ${
            percent >= 70 ? "text-green-600" : "text-red-500"
          }`}
        >
          {percent >= 70 ? t("successMessage") : t("failMessage")}
        </p>

        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#2563eb"
              strokeWidth="10"
              strokeDasharray="282.6"
              strokeDashoffset={282.6 - (282.6 * percent) / 100}
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-blue-700 text-2xl font-extrabold">
            {percent}%
          </div>
        </div>

        <div className="flex gap-3 text-lg font-medium text-gray-700 mb-6">
          <div className="bg-green-100 px-4 py-2 rounded-xl w-1/2">
            ✅ {t("correct")}: {correct}
          </div>
          <div className="bg-red-100 px-4 py-2 rounded-xl w-1/2">
            ❌ {t("incorrect")}: {incorrect}
          </div>
        </div>

        <button
          onClick={handleTryAgain}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition cursor-pointer"
        >
          {t("startAgain")}
        </button>
      </div>
      <LanguageSwitcher />
      <ThemeToggle />
      <SignInButton />
    </div>
  );
};

export default Result;
