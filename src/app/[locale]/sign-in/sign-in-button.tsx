"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const SignInButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("sign-in-button");
  const handleSignIn = () => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    } else {
      router.push("/");
      signOut();
    }
  };

  return (
    <div className="absolute top-4 ">
      <button
        onClick={handleSignIn}
        className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base shadow-sm transition-all cursor-pointer"
      >
        {session ? t("signOut") + ` (${session.user?.name})` : t("signIn")}
      </button>
    </div>
  );
};

export default SignInButton;
