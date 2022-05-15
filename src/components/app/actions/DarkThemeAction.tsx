import React from "react";
import { useDarkMode } from "hooks/useDarkMode";
import { useTranslation } from "react-i18next";
import { useAppBarActions } from "hooks/useAppBarActions";
import { ListItem, ListItemText, ListItemIcon } from "ui/List";
import MaterialSymbol from "ui/icons/MaterialSymbol";

interface IDarkThemeActionProps {}

const DarkThemeAction: React.FunctionComponent<IDarkThemeActionProps> = () => {
  const { t } = useTranslation();
  const isDarkMode = useDarkMode();
  const { toggleDarkMode } = useAppBarActions();

  return (
    <ListItem onClick={toggleDarkMode}>
      <ListItemIcon>
        <MaterialSymbol icon={isDarkMode ? "dark_mode" : "light_mode"} />
      </ListItemIcon>
      <ListItemText>{t(`action/dark_theme/${isDarkMode ? "on" : "off"}`)}</ListItemText>
    </ListItem>
  );
};

export default DarkThemeAction;
