"use client";
import { useDispatch } from "react-redux";
import { resetQuiz, setQuizType } from "@/store/quizSlice";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import ThemeToggle from "@/components/theme";

export default function SelectQuizPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("SelectQuizPage");

  const quizTypes = [
    { label: t("compQuiz"), value: "compQuiz" },
    { label: t("mathQuiz"), value: "mathQuiz" },
    { label: t("phyzQuiz"), value: "phyzQuiz" },
    { label: t("engQuiz"), value: "engQuiz" },
  ];

  const handleSelect = (type: string) => {
    dispatch(setQuizType(type));
    dispatch(resetQuiz());
    router.push("/data/1");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      {quizTypes.map((quiz) => (
        <button
          key={quiz.value}
          onClick={() => handleSelect(quiz.value)}
          className="bg-blue-600 text-white px-6 py-4 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer text-3xl font-medium"
        >
          {quiz.label}
        </button>
      ))}
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
}
