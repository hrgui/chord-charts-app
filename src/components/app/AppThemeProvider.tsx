import { Theme } from "react-daisyui";

import { useDarkMode } from "~/hooks/useDarkMode";

export function AppThemeProvider({ children }) {
  const isDarkMode = useDarkMode();

  return <Theme dataTheme={isDarkMode ? "dark" : "light"}>{children}</Theme>;
}

export default AppThemeProvider;
