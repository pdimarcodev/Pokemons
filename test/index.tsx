import React, { ReactElement, ReactNode } from "react";
import {
  RenderOptions,
  render as rtlRender,
} from "@testing-library/react-native";
import ContextProvider from "@/context/Provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <ContextProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </ContextProvider>
  );
};

const render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
  return {
    ...rtlRender(ui, { wrapper: Providers, ...options }),
  };
};

export * from "@testing-library/react-native";
export { render };
