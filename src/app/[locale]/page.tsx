"use client";

import ThemeToggle from "@/components/theme";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import { useSelector } from "react-redux";
// import { login, logout } from "@/store/userSlice";
import type { RootState } from "@/store/index";

export default function Home() {
  const t = useTranslations("HomePage");
  const router = useRouter();
  // const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  console.log(user);

  const handleStartQuiz = () => {
    localStorage.setItem("quizIdx", "1");
    localStorage.setItem("correct", "0");
    localStorage.removeItem("answered");
    router.push("/data/1");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl p-8 sm:p-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6 leading-snug">
          {t("title")}! 👋
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-8">{t("about")}</p>
        <button
          onClick={handleStartQuiz}
          className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 transition font-semibold rounded-full text-lg sm:text-xl shadow-md cursor-pointer"
        >
          {t("startButton")}
        </button>
      </div>
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
}
