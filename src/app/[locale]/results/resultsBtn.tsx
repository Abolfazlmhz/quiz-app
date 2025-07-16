import Link from "next/link";
import { FileUser } from "lucide-react";
import { memo } from "react";

const ResultBtn = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 group">
      <Link href="/results" title="results">
        <div className="w-11 h-11 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 relative">
          <FileUser className="w-7 h-7" />
          <span className="absolute -top-2 -right-2 bg-white text-green-600 text-[10px] px-1.5 py-0.5 rounded-full shadow group-hover:scale-110 transition-transform duration-300">
            نتایج
          </span>
        </div>
      </Link>
    </div>
  );
};

export default memo(ResultBtn);
