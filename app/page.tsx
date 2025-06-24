"use client";
import { ThemeToggle } from "@/components/theme";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
          به آزمون آنلاین خوش اومدی! 👋
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-8">
          برای شروع آزمون دکمه زیر را بزن و خودتو به چالش بکش!
        </p>
        <button
          onClick={handleStartQuiz}
          className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 transition font-semibold rounded-full text-lg sm:text-xl shadow-md cursor-pointer"
        >
          شروع آزمون
        </button>
      </div>
      <div className="absolute top-4 left-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
