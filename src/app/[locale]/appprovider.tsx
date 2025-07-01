"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function AppProviders({ children, session }: any) {
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
