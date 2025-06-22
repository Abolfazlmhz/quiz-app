"use client";

import quiz from "./quiz";
import QuizTable from "@/components/data/QuizTable";
import { useState } from "react";

const page = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] =
    useState<number>(null);

  const data = quiz[0];

  return <QuizTable data={data} />;
};

export default page;
