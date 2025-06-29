"use client";

import { ThemeProvider } from "next-themes";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="light"
        enableSystem
        themes={["light", "dark", "blue"]} // Add your themes here
      >
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
