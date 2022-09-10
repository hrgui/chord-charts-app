import { useTranslation } from "react-i18next";

import { useAppBarActions } from "~/hooks/useAppBarActions";
import { useDarkMode } from "~/hooks/useDarkMode";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import { ListItem, ListItemText, ListItemIcon } from "~/ui/List";

const DarkThemeAction = () => {
  const { t } = useTranslation();
  const isDarkMode = useDarkMode();
  const { toggleDarkMode } = useAppBarActions();

  return (
    <ListItem onClick={toggleDarkMode} dismissMobileMenu={false}>
      <ListItemIcon>
        <MaterialSymbol icon={isDarkMode ? "dark_mode" : "light_mode"} />
      </ListItemIcon>
      <ListItemText>
        {t(`action/dark_theme/${isDarkMode ? "on" : "off"}`)}
      </ListItemText>
    </ListItem>
  );
};

export default DarkThemeAction;
