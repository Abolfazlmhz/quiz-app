"use client";
import { memo, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function SignInButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("sign-in-button");

  const handleSignIn = useCallback(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    } else {
      signOut({ callbackUrl: "/" });
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <div className="fixed bottom-3 right-0 sm:bottom-4 sm:right-4 z-50">
      <button
        onClick={handleSignIn}
        className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base shadow-sm transition-all cursor-pointer"
      >
        {session ? `${t("signOut")} (${session.user?.name})` : t("signIn")}
      </button>
    </div>
  );
}

export default memo(SignInButton);
