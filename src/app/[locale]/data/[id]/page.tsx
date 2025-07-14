"use client";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { resetQuiz, setQuizIdx, setSize } from "@/store/quizSlice";

import QuizTable from "@/components/data/QuizTable";
import compQuiz from "@/quizes/compQuiz";
import mathQuiz from "@/quizes/mathQuiz";
import phyzQuiz from "@/quizes/phyzQuiz";
import engQuiz from "@/quizes/engQuiz";

interface PageData {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const quizType = useSelector((state: RootState) => state.quiz.type);
  const quizIdx = useSelector((state: RootState) => state.quiz.quizIdx);
  const answered = useSelector((state: RootState) => state.quiz.answered);

  const [question, setQuestion] = useState<PageData | null>(null);

  const quiz = useMemo(() => {
    switch (quizType) {
      case "compQuiz":
        return compQuiz;
      case "mathQuiz":
        return mathQuiz;
      case "phyzQuiz":
        return phyzQuiz;
      case "engQuiz":
        return engQuiz;
      default:
        return [];
    }
  }, [quizType]);

  const isStateReady = quizType !== null && quizIdx !== 0;

  useEffect(() => {
    if (!isStateReady || !id) return;
    dispatch(setSize(quiz.length));
    const currentId = parseInt(id as string);

    if (
      !quizType ||
      isNaN(currentId) ||
      currentId < 1 ||
      currentId > quiz.length
    ) {
      dispatch(resetQuiz());
      router.push("/");
      return;
    }

    if (answered.includes(currentId)) {
      if (currentId !== quizIdx) {
        router.push(`/data/${quizIdx}`);
      } else {
        setQuestion(quiz[currentId - 1]);
      }
      return;
    }

    if (currentId !== quizIdx) {
      dispatch(setQuizIdx(currentId));
      return;
    }

    setQuestion(quiz[currentId - 1]);
  }, [id, quizType, quiz, quizIdx, dispatch, router, answered, isStateReady]);

  if (!isStateReady || !question) {
    return <div className="text-center p-10">در حال بارگذاری...</div>;
  }

  return <QuizTable data={question} size={quiz.length} />;
};

export default Page;
