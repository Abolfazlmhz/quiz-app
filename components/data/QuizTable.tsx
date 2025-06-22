"use client";
import { PageData } from "@/app/data/[id]/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const QuizTable = ({ data }: { data: PageData }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  const handleStartQuiz = () => {
    localStorage.setItem("quizIdx", (data.id + 1).toString());
    router.push(`/data/${data.id + 1}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {data.question}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {data.options.map((opt, index) => (
            <label
              key={index}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition text-black text-2xl
                ${
                  isSubmitted
                    ? opt === data.answer
                      ? "border-green-500 bg-green-50 text-green-700"
                      : opt === selected
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-300"
                    : "hover:text-blue-400  "
                }`}
            >
              <input
                type="radio"
                name="option"
                value={opt}
                disabled={isSubmitted}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                className="form-radio accent-blue-500 ml-3"
              />
              {opt}
            </label>
          ))}
        </div>

        {!isSubmitted ? (
          <button
            type="submit"
            disabled={!selected}
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            ثبت پاسخ
          </button>
        ) : (
          <div className="mt-3 flex justify-between items-center text-2xl">
            <p className="font-medium text-2xl">
              {selected === data.answer ? (
                <span className="text-green-600">✅ درست پاسخ دادی!</span>
              ) : (
                <span className="text-red-600">
                  ❌ اشتباه بود. پاسخ درست: {data.answer}
                </span>
              )}
            </p>
            <button
              className="text-green-700 cursor-pointer"
              onClick={handleStartQuiz}
            >
              سؤال بعدی
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuizTable;
