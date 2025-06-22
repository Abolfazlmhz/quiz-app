import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

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
    <html lang="fa-IR" dir="rtl">
      <body
        className={`${vazir.variable} antialiased flex items-center justify-center h-screen text-center font-bold text-4xl`}
      >
        {children}
      </body>
    </html>
  );
}
