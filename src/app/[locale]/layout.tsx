import "./globals.css";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import AppProviders from "./appprovider";
import { routing } from "@/i18n/routing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  display: "swap",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "کوییز",
  description: "آزمونکی کوتاه",
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
          <AppProviders session={session}>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
