"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";

export default function AppProviders({ children, session }: any) {
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}
