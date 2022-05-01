import React from "react";
import { ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { useDarkMode } from "lib/hooks/useDarkMode";
import { useTranslation } from "react-i18next";

interface IDarkThemeActionProps {}

const DarkThemeAction: React.FunctionComponent<IDarkThemeActionProps> = () => {
  const { t } = useTranslation();
  const isDarkMode = useDarkMode();

  return (
    <ListItem button onClick={() => {}}>
      <ListItemText primary={t(`action/dark_theme/${isDarkMode ? "on" : "off"}`)} />
    </ListItem>
  );
};

export default DarkThemeAction;
