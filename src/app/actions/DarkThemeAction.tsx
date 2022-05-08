import React from "react";
import { Button } from "react-daisyui";
import { useDarkMode } from "lib/hooks/useDarkMode";
import { useTranslation } from "react-i18next";
import { useAppBarActions } from "lib/hooks/useAppBarActions";

interface IDarkThemeActionProps {}

const DarkThemeAction: React.FunctionComponent<IDarkThemeActionProps> = () => {
  const { t } = useTranslation();
  const isDarkMode = useDarkMode();
  const { toggleDarkMode } = useAppBarActions();

  return (
    <Button onClick={toggleDarkMode}>{t(`action/dark_theme/${isDarkMode ? "on" : "off"}`)}</Button>
  );
};

export default DarkThemeAction;
