import React from "react";
import { useDarkMode } from "ui/hooks/useDarkMode";
import { Theme } from "react-daisyui";

export function AppThemeProvider({ children }) {
  const isDarkMode = useDarkMode();

  return <Theme dataTheme={isDarkMode ? "dark" : "light"}>{children}</Theme>;
}

export default AppThemeProvider;
