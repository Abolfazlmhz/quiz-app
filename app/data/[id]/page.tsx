"use client";
import quiz from "./quiz";
import QuizTable from "@/components/data/QuizTable";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageData } from "./types";

const page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [question, setQuestion] = useState<PageData | null>(null);

  useEffect(() => {
    const currentId = parseInt(id as string);
    const quizIdx = parseInt(localStorage.getItem("quizIdx") || "-1");

    const isValidIndex =
      !isNaN(currentId) &&
      !isNaN(quizIdx) &&
      currentId === quizIdx &&
      currentId >= 1 &&
      currentId <= quiz.length;

    if (isValidIndex) {
      setQuestion(quiz[currentId - 1]);
    } else {
      router.push("/");
      localStorage.removeItem("quizIdx");
      localStorage.removeItem("correct");
    }
  }, []);

  return (
    <div>
      {question && <QuizTable data={question} size={quiz.length} />}
    </div>
  );
};

export default page;
