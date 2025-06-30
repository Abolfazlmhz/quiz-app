"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function DashboardClient() {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  return (
    <div className="p-8 text-xl text-gray-800">
      <h1>خوش اومدی {user?.name || "مهمان"} 👋</h1>
    </div>
  );
}
