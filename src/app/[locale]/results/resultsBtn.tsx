import Link from "next/link";
import { FileUser } from "lucide-react";
import { memo } from "react";
const ResultBtn = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Link href={"/results"}>
        <FileUser className="w-10 h-10 text-green-700" />
      </Link>
    </div>
  );
};

export default memo(ResultBtn);
