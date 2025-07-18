"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import ThemeToggle from "@/components/theme";
import SignInButton from "@/app/[locale]/sign-in/sign-in-button";
import ResultBtn from "./results/resultsBtn";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { setCurrentUser } from "@/store/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import InstallPrompt from "@/components/install/InstallPrompt";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { status, data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("HomePage");
  const currentUser = useSelector((state: RootState) => state.quiz.currentUser);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user?.name && !currentUser) {
      dispatch(setCurrentUser(session.user.name));
    }
  }, [session, currentUser, dispatch]);

  const handleStartQuiz = useCallback(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    } else {
      router.push("/select-quiz");
    }
  }, [status, router]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-10">
      <div className="absolute -top-20 -left-20 w-3/5 h-3/5 bg-purple-400 rounded-full opacity-30 animate-blob"></div>
      <div className="absolute -bottom-24 -right-16 w-1/2 h-1/2 bg-pink-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>

      <div className="z-10 bg-white/80 max-w-xl w-full rounded-3xl shadow-xl p-12 text-center">
        <h1
          className={`text-5xl font-extrabold mb-5 pt-3 
    bg-gradient-to-r from-cyan-300 via-cyan-600 to-blue-700 
    bg-clip-text text-transparent leading-14 flex items-center justify-center gap-3
    ${mounted ? "animate-fade-in" : ""}
  `}
        >
          {t("title")}!
        </h1>

        <p
          className={`text-gray-700 text-base sm:text-lg mb-8 
    ${mounted ? "animate-fade-in animation-delay-500" : ""}
  `}
        >
          {t("about")}
        </p>

        <button
          onClick={handleStartQuiz}
          className={`px-8 py-3 text-white bg-blue-600 hover:bg-purple-700
    transition font-semibold rounded-full text-lg sm:text-xl shadow-md cursor-pointer
    ${mounted ? "animate-fade-in animation-delay-1000" : ""}
  `}
        >
          {t("startButton")}
        </button>
      </div>

      <SignInButton />
      <LanguageSwitcher />
      <ThemeToggle />
      <ResultBtn />
      <InstallPrompt />
    </div>
  );
}
