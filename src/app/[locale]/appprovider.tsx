"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Session } from "next-auth";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  session: Session | null;
}
export default function AppProviders({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="light"
        enableSystem
        themes={["light", "dark", "blue"]} // Add your themes here
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
