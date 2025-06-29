"use client";
import { useTheme } from "next-themes";
import { useState, useEffect, memo } from "react";

function areEqual(prevProps: unknown, nextProps: unknown) {
  console.log(prevProps, nextProps);
  return true;
}

function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // ✨ جدید

  useEffect(() => {
    setMounted(true); // وقتی کامپوننت mount شد، true میشه
  }, []);

  function handleClick() {
    setOpen(false);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const themes = [
    { id: "light", label: "Light", icon: "🌞" },
    { id: "dark", label: "Dark", icon: "🌙" },
    { id: "blue", label: "Blue", icon: "🔵" },
  ];

  if (!mounted) return null;

  return (
    <div className="absolute top-4 left-4">
      <div className="relative inline-block text-left">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full transition cursor-pointer"
        >
          {theme === "dark" ? "🌙" : theme === "blue" ? "🔵" : "🌞"}
        </button>

        {open && (
          <div className="mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    theme === t.id
                      ? "font-semibold text-blue-600 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <span className="mr-2">{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ThemeToggle, areEqual);
