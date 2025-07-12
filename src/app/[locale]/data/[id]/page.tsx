"use client";

import QuizTable from "@/components/data/QuizTable";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import compQuiz from "@/quizes/compQuiz";
import mathQuiz from "@/quizes/mathQuiz";
import phyzQuiz from "@/quizes/phyzQuiz";
import engQuiz from "@/quizes/engQuiz";
import { resetQuiz, setSize } from "@/store/quizSlice";

interface PageData {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const quizType = useSelector((state: RootState) => state.quiz.type);
  const quizIdx = useSelector((state: RootState) => state.quiz.quizIdx);
  const [question, setQuestion] = useState<PageData | null>(null);

  const quiz =
    quizType === "compQuiz"
      ? compQuiz
      : quizType === "mathQuiz"
      ? mathQuiz
      : quizType === "phyzQuiz"
      ? phyzQuiz
      : engQuiz;

  useEffect(() => {
    if (!quizType || !id) {
      router.push("/");
      return;
    }

    dispatch(setSize(quiz.length));

    const currentId = parseInt(id as string);
    if (
      isNaN(currentId) ||
      currentId !== quizIdx ||
      currentId < 1 ||
      currentId > quiz.length
    ) {
      dispatch(resetQuiz());
      router.push("/");
      return;
    }

    setQuestion(quiz[currentId - 1]);
  }, [id, quizType]);

  return (
    <div>{question && <QuizTable data={question} size={quiz.length} />}</div>
  );
};

export default Page;
