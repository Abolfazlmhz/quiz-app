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
  const time: number = 60;
  const [timeLeft, setTimeLeft] = useState(time);
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
      return;
    }

    const key = `quiz-start-${data.id}`;
    let startTime: number;

    const savedStart = localStorage.getItem(key);
    if (savedStart) {
      startTime = parseInt(savedStart);
    } else {
      startTime = Date.now();
      localStorage.setItem(key, startTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = time - elapsed;

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        setTimeExpired(true);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data.id, answered, userAnswer]);

  useEffect(() => {
    if (!timeExpired || isSubmitted) return;

    setIsSubmitted(true);
    dispatch(addAnswered(data.id));
    dispatch(setAnswer({ id: data.id, answer: selected ?? "" }));
    localStorage.removeItem(`quiz-start-${data.id}`);
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
      localStorage.removeItem(`quiz-start-${data.id}`);
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
