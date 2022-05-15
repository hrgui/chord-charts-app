import * as React from "react";
import ListItemLink from "ui/layout/ListItemLink";
import SongsNavMenu from "components/songs/menu/SongsNavMenu";
import SetlistsNavMenu from "components/setlists/menu/SetlistsNavMenu";
import { useAppBarActions } from "hooks/useAppBarActions";
import { useGetAppBarData } from "hooks/useGetAppBarData";
import Drawer from "ui/Drawer";
import { List, ListItemText, ListItemIcon, ListItem } from "ui/List";
import Divider from "ui/Divider";
import CloseIcon from "ui/icons/CloseIcon";
import { Button } from "react-daisyui";
import ClearLocalDbAction from "./actions/ClearLocalDbAction";
import { useTranslation } from "react-i18next";
import DarkThemeAction from "./actions/DarkThemeAction";
import MaterialSymbol from "ui/icons/MaterialSymbol";

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
      <div className="flex items-center font-medium h-12 text-base min-h-[48px] pl-2 pr-2">
        {config.appName}
        <Button
          onClick={toggleNavMenu}
          className="ml-auto sm:hidden"
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
      <Divider />
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
        <ClearLocalDbAction />
        <DarkThemeAction />
      </List>
    </Drawer>
  );
}

export default AppNavMenu;
