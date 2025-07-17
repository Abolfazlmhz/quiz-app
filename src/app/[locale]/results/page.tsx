"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import ThemeToggle from "@/components/theme";
import SignInButton from "../sign-in/sign-in-button";
import ResultsTable from "./ResultsTable";

const Results = () => {
  const currentUser = useSelector((state: RootState) => state.quiz.currentUser);
  const results = useSelector((state: RootState) =>
    currentUser ? state.quiz.results[currentUser] : null
  );
  const { theme } = useTheme();
  const t = useTranslations("SelectQuizPage");
  const t2 = useTranslations("resultsHistory");

  type QuizType = "phyzQuiz" | "compQuiz" | "mathQuiz" | "engQuiz";

  const quizNames = useMemo<Record<QuizType, string>>(
    () => ({
      phyzQuiz: t("phyzQuiz"),
      compQuiz: t("compQuiz"),
      mathQuiz: t("mathQuiz"),
      engQuiz: t("engQuiz"),
    }),
    [t]
  );

  if (!results || Object.keys(results).length === 0) {
    return (
      <div className="p-52 max-w-4xl mx-auto">
        <h1
          className={`text-4xl font-extrabold text-center ${
            theme === "light" ? "text-blue-800" : "text-white"
          } mb-8`}
        >
          {t2("noResults")}
        </h1>
        <LanguageSwitcher />
        <SignInButton />
        <ThemeToggle />
      </div>
    );
  }
  return (
    <div className="p-6 mt-10 max-w-4xl mx-auto">
      <h1
        className={`text-4xl font-extrabold text-center ${
          theme === "light" ? "text-blue-800" : "text-white"
        } mb-8`}
      >
        {t2("title")}
      </h1>

      {Object.entries(results).map(([quizType, attempts]) => {
        const typedQuizType = quizType as QuizType;

        return (
          <ResultsTable
            key={typedQuizType}
            attempts={attempts}
            quizType={typedQuizType}
            quizNames={quizNames}
            theme={theme}
            t2={t2}
          />
        );
      })}

      <LanguageSwitcher />
      <SignInButton />
      <ThemeToggle />
    </div>
  );
};
export default Results;
