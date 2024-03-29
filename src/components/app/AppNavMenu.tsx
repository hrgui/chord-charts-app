import { Button } from "react-daisyui";
import { useTranslation } from "react-i18next";

import SetlistsNavMenu from "~/components/setlists/menu/SetlistsNavMenu";
import SongsNavMenu from "~/components/songs/menu/SongsNavMenu";
import { useAppBarActions } from "~/hooks/useAppBarActions";
import { useGetAppBarData } from "~/hooks/useGetAppBarData";
import Divider from "~/ui/Divider";
import Drawer from "~/ui/Drawer";
import CloseIcon from "~/ui/icons/CloseIcon";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import ListItemLink from "~/ui/layout/ListItemLink";
import { List, ListItemText, ListItemIcon, ListSubheader } from "~/ui/List";

import DarkThemeAction from "./actions/DarkThemeAction";
import NewAction from "./actions/NewAction";
import OpenAction from "./actions/OpenAction";
import SaveAction from "./actions/SaveAction";
import SaveAsAction from "./actions/SaveAsAction";

export function AppNavMenu() {
  const config = useGetAppBarData();
  const { toggleNavMenu } = useAppBarActions();
  const { t } = useTranslation();

  if (!config) {
    return null;
  }

  const { navMenuHidden } = config;

  return (
    <Drawer className="cc-appNavMenu" open={!navMenuHidden}>
      <div className="flex items-center uppercase tracking-widest font-semibold h-12 text-base min-h-[48px] pl-2 pr-2">
        {config.appName}
        <Button
          onClick={toggleNavMenu}
          className="ml-auto sm:hidden btn-ghost"
          shape="square"
          startIcon={<CloseIcon />}
        ></Button>
      </div>
      <Divider />
      <List dense>
        <ListItemLink to="/">
          <ListItemIcon>
            <MaterialSymbol icon={"home"} />
          </ListItemIcon>
          <ListItemText>{t("home")}</ListItemText>
        </ListItemLink>
      </List>
      <List>
        <ListSubheader>File</ListSubheader>
        <NewAction />
        <OpenAction />
        <SaveAction />
        <SaveAsAction />
      </List>
      <Divider />
      <SongsNavMenu />
      <Divider />
      <SetlistsNavMenu />
      <Divider />
      <List>
        <ListItemLink to="/about">
          <ListItemIcon>
            <MaterialSymbol icon={"info"} />
          </ListItemIcon>
          <ListItemText>{t("about")}</ListItemText>
        </ListItemLink>
        <DarkThemeAction />
      </List>
    </Drawer>
  );
}

export default AppNavMenu;
