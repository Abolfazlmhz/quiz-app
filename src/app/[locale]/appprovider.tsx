"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Session } from "next-auth";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { persister } from "@/store";

interface Props {
  children: ReactNode;
  session: Session | null;
}
export default function AppProviders({ children, session }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
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
      </PersistGate>
    </Provider>
  );
}
