import "./globals.css";
import { Vazirmatn } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import AppProvider from "./AppProvider";
import { routing } from "@/i18n/routing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/authOptions";
import type { Metadata } from "next";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  display: "swap",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Quiz App",
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      sizes: "192x192",
      url: "/icons/icon1.png",
    },
    {
      rel: "apple-touch-icon",
      url: "/icons/apple-icon.png",
    },
  ],
  themeColor: "#2563eb",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${vazir.variable} antialiased h-screen text-center font-bold text-4xl`}
      >
        <NextIntlClientProvider>
          <AppProvider session={session}>{children}</AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
