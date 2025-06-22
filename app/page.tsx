"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleStartQuiz = () => {
    localStorage.setItem("quizIdx", "1");
    router.push("/data/1");
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <h3>سلام به کوییز خوش اومدید</h3>
      <button
        className="mt-[2rem] block p-5 h-20 bg-cyan-700 rounded-[2.5rem]"
        onClick={handleStartQuiz}
      >
        شروع آزمون
      </button>
    </div>
  );
}
