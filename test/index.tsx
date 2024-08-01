import React, { ReactElement, ReactNode } from "react";
import {
  RenderOptions,
  render as rtlRender,
} from "@testing-library/react-native";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils/fetcher";
import ContextProvider from "@/context/Provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

const Providers = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  return (
    <ContextProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          {children}
        </SWRConfig>
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
