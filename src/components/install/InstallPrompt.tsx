"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const t = useTranslations("install");
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-4 bg-cyan-600 text-white text-sm px-4 py-3 flex items-center gap-2 flex-col z-50 shadow-md rounded-2xl">
      <span>{t("title")}</span>
      <div className="space-x-2">
        <button
          onClick={() => setShowPrompt(false)}
          className="bg-white text-blue-600 px-3 py-1 rounded text-sm cursor-pointer"
        >
          {t("close")}
        </button>
        <button
          onClick={handleInstall}
          className="bg-white text-blue-600 px-3 py-1 rounded text-sm cursor-pointer"
        >
          {t("install")}
        </button>
      </div>
    </div>
  );
}
