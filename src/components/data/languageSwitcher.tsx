import { useRouter, usePathname } from "@/i18n/navigation";

import { useLocale } from "next-intl";
import { memo } from "react";

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="fixed top-3 right-0 sm:top-4 sm:right-4">
      <button
        className="cursor-pointer"
        onClick={() => {
          router.replace(`${pathname}`, {
            locale: locale === "en" ? "fa" : "en",
          });
        }}
      >
        🌐
      </button>
    </div>
  );
}

export default memo(LanguageSwitcher);
