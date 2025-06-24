import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazir.variable} antialiased h-screen text-center font-bold text-4xl`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
