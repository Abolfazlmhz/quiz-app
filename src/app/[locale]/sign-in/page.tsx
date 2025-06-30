"use client";

import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/theme";
import LanguageSwitcher from "@/components/data/languageSwitcher";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";

export default function SignInPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const t = useTranslations("SignInPage");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (!res?.error) {
      router.push("/dashboard");
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-xl p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-4">
          {t("title")}
        </h2>
        <p className="text-center text-gray-500 mb-6">{t("subtitle")}</p>

        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("username")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition shadow"
          >
            {t("login")}
          </button>

          <button
            onClick={() => signIn("github")}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 .297c-6.6 0-12 5.373-12 12 0 5.3 3.438 9.8 8.205 11.4.6.113.82-.26.82-.577v-2.21c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.834 2.808 1.304 3.495.997.108-.776.42-1.305.763-1.605-2.665-.304-5.466-1.334-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.01-.322 3.3 1.23a11.47 11.47 0 0 1 6 0c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.874.118 3.176.768.84 1.234 1.91 1.234 3.22 0 4.61-2.8 5.624-5.475 5.922.43.37.814 1.096.814 2.21v3.285c0 .32.217.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            {t("loginWithGithub")}
          </button>
        </div>
      </div>
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
}
