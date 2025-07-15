"use client";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuizIdx,
  incrementCorrect,
  addAnswered,
  setAnswer,
} from "@/store/quizSlice";
import { RootState } from "@/store";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import ThemeToggle from "@/components/theme";
import SignInButton from "@/app/[locale]/sign-in/sign-in-button";
import ProgressBar from "./ProgressBar";
import QuizOptions from "./QuizOptions";

interface PageData {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const QuizTable = ({ data, size }: { data: PageData; size: number }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const answered = useSelector((state: RootState) => state.quiz.answered);
  const userAnswer = useSelector(
    (state: RootState) => state.quiz.answers?.[data.id]
  );

  useEffect(() => {
    if (answered.includes(data.id)) {
      setIsSubmitted(true);
      if (userAnswer) setSelected(userAnswer);
    }
  }, [answered, data.id, userAnswer]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!answered.includes(data.id)) {
        if (selected === data.answer) {
          dispatch(incrementCorrect());
        }
        dispatch(addAnswered(data.id));
        dispatch(setAnswer({ id: data.id, answer: selected! }));
      }

      setIsSubmitted(true);
    },
    [answered, data.id, data.answer, selected, dispatch]
  );

  const goToNext = useCallback(() => {
    const nextId = data.id + 1;
    if (nextId > size) {
      router.push("/result");
    } else {
      dispatch(setQuizIdx(nextId));
      router.push(`/data/${nextId}`);
    }
  }, [data, size, router, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 overflow-hidden">
      <div className="relative w-full max-w-xl bg-white/85 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 text-[14px] sm:text-base">
        <ProgressBar current={data.id} total={size} />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-4 sm:mb-6 text-center animate-fade-in">
          {data.question}
        </h2>

        <form onSubmit={handleSubmit}>
          <QuizOptions
            options={data.options}
            selected={selected}
            correct={data.answer}
            isSubmitted={isSubmitted}
            onSelect={setSelected}
          />

          {!isSubmitted ? (
            <>
              <button
                type="submit"
                disabled={!selected}
                className="mt-4 w-full py-3 bg-blue-600 text-white text-lg sm:text-xl font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
              >
                ثبت پاسخ
              </button>
              <div className="text-sm sm:text-base text-gray-500 mt-5 mr-2 ml-2 text-right">
                سؤال {data.id} از {size}
              </div>
            </>
          ) : (
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-lg font-semibold gap-4">
              <p>
                {selected === data.answer ? (
                  <span className="text-green-700">
                    ✅ آفرین! پاسخ درست بود
                  </span>
                ) : (
                  <span className="text-red-600">
                    ❌ متأسفانه اشتباه بود. جواب درست: <b>{data.answer}</b>
                  </span>
                )}
              </p>
              <button
                onClick={goToNext}
                className="text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
              >
                {data.id === size ? "مشاهده نتیجه" : "سؤال بعدی →"}
              </button>
            </div>
          )}
        </form>
      </div>

      <SignInButton />
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
};

export default memo(QuizTable);
