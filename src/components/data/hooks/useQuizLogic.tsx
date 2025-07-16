import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuizIdx,
  incrementCorrect,
  addAnswered,
  setAnswer,
} from "@/store/quizSlice";
import { RootState } from "@/store";

export const useQuizLogic = (
  data: { id: number; answer: string },
  size: number
) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeExpired, setTimeExpired] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
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

  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setTimeExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  useEffect(() => {
    if (!timeExpired || isSubmitted) return;

    setIsSubmitted(true);
    dispatch(addAnswered(data.id));
    dispatch(setAnswer({ id: data.id, answer: selected ?? "" }));
  }, [timeExpired, isSubmitted, dispatch, data.id, selected]);

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
  }, [data.id, size, dispatch, router]);

  return {
    selected,
    setSelected,
    isSubmitted,
    timeLeft,
    handleSubmit,
    goToNext,
  };
};
