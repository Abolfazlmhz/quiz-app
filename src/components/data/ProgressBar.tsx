import { memo } from "react";

const ProgressBar = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  const percentage = (current / total) * 100;
  return (
    <div className="absolute top-0 w-10/12 h-2 bg-gray-200 rounded-t-3xl overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default memo(ProgressBar);
