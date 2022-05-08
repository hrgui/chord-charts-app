import React from "react";
import { createMuiTheme } from "@material-ui/core";
import theme from "lib/theme/theme";
import { ThemeProvider } from "styled-components/macro";
import { useDarkMode } from "lib/hooks/useDarkMode";
import { Theme } from "react-daisyui";

export function AppThemeProvider({ children }) {
  const isDarkMode = useDarkMode();
  const _theme: any = theme(isDarkMode);
  const __theme = createMuiTheme(_theme);

  return (
    <ThemeProvider theme={__theme}>
      <Theme dataTheme={isDarkMode ? "dark" : "light"}>{children}</Theme>
    </ThemeProvider>
  );
}

export default AppThemeProvider;
