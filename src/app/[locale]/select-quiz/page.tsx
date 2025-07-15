"use client";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";
import { resetQuiz, setQuizType } from "@/store/quizSlice";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import ThemeToggle from "@/components/theme";
import SignInButton from "../sign-in/sign-in-button";
import { CodeIcon, BrainIcon, LanguagesIcon, AtomIcon } from "lucide-react";
import { useCallback } from "react";
import QuizCard from "./QuizCard";

export default function SelectQuizPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("SelectQuizPage");
  const { theme } = useTheme();
  const quizTypes = [
    {
      label: t("compQuiz"),
      value: "compQuiz",
      icon: <CodeIcon className="w-8 h-8 text-blue-700" />,
      color: "bg-blue-100",
    },
    {
      label: t("mathQuiz"),
      value: "mathQuiz",
      icon: <BrainIcon className="w-8 h-8 text-purple-700" />,
      color: "bg-purple-100",
    },
    {
      label: t("phyzQuiz"),
      value: "phyzQuiz",
      icon: <AtomIcon className="w-8 h-8 text-green-700" />,
      color: "bg-green-100",
    },
    {
      label: t("engQuiz"),
      value: "engQuiz",
      icon: <LanguagesIcon className="w-8 h-8 text-pink-700" />,
      color: "bg-pink-100",
    },
  ];

  const handleSelect = useCallback(
    (type: string) => {
      dispatch(setQuizType(type));
      dispatch(resetQuiz());
      router.push("/data/1");
    },
    [dispatch, router]
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <h1
        className={`text-4xl font-extrabold mb-10 text-center ${
          theme === "light" ? "text-blue-800" : "text-white"
        }`}
      >
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {quizTypes.map((quiz) => (
          <QuizCard
            key={quiz.value}
            icon={quiz.icon}
            label={quiz.label}
            color={quiz.color}
            onClick={() => handleSelect(quiz.value)}
          />
        ))}
      </div>
      <div className="mt-10 flex gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
        <SignInButton />
      </div>
    </div>
  );
}
