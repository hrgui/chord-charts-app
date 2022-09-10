import { useDarkMode } from "~/hooks/useDarkMode";
import { useTranslation } from "react-i18next";
import { useAppBarActions } from "~/hooks/useAppBarActions";
import { ListItem, ListItemText, ListItemIcon } from "~/ui/List";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";

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
