import { useRouter, usePathname } from "@/i18n/navigation";

import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="fixed top-4 right-4">
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
