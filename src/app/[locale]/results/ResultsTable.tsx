"use client";
import { memo } from "react";
import { format } from "date-fns-jalali";

interface ResultType {
  correct: number;
  total: number;
  date: string;
}

interface Props {
  attempts: ResultType[];
  quizType: string;
  quizNames: Record<string, string>;
  theme: string | undefined;
  t2: (key: string) => string;
}

const ResultsTable = memo(
  ({ attempts, quizType, quizNames, theme, t2 }: Props) => {
    return (
      <div className="mb-10">
        <h2
          className={`text-xl font-semibold mb-4 ${
            theme === "light" ? "text-gray-700" : "text-white"
          }`}
        >
          {t2("quizLabel")} {quizNames[quizType] || quizType}
        </h2>
        <table className="w-full border border-gray-300 rounded-xl overflow-hidden text-sm sm:text-base">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">{t2("successRate")}</th>
              <th className="p-2">{t2("correctOutOfTotal")}</th>
              <th className="p-2">{t2("date")}</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((result, index) => {
              const percent = Math.round((result.correct / result.total) * 100);
              const date = format(new Date(result.date), "yyyy/MM/dd HH:mm");
              return (
                <tr key={index} className="text-center border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{percent}%</td>
                  <td className="p-2">
                    {result.total} / {result.correct}
                  </td>
                  <td className="p-2">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);

ResultsTable.displayName = "ResultsTable";
export default ResultsTable;
