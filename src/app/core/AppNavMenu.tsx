import * as React from "react";
import ListItemLink from "lib/layout/ListItemLink";
import Home from "@material-ui/icons/Home";
import SongsNavMenu from "app/songs/menu/SongsNavMenu";
import SetlistsNavMenu from "app/setlists/menu/SetlistsNavMenu";
import { useAppBarActions } from "lib/hooks/useAppBarActions";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";
import Drawer from "ui/Drawer";
import { List, ListItemText, ListItemIcon } from "ui/List";
import Divider from "ui/Divider";

export interface NavMenuProps {
  classes?: any;
}

export function HomeNavMenu() {
  return (
    <List dense>
      <ListItemLink to="/">
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText>Home</ListItemText>
      </ListItemLink>
    </List>
  );
}

export function NavMenuItems() {
  return (
    <>
      <HomeNavMenu />
      <Divider />
      <Divider />
      <SongsNavMenu />
      <Divider />
      <SetlistsNavMenu />
    </>
  );
}

export function AppNavMenu() {
  const config = useGetAppBarData();
  const { toggleNavMenu } = useAppBarActions();

  if (!config) {
    return null;
  }

  const { navMenuHidden } = config;

  return (
    <Drawer className="cc-appNavMenu" open={!navMenuHidden}>
      <div className="flex items-center font-medium h-12 text-base min-h-[48px] pl-2 pr-2">
        {config.appName}
      </div>
      <Divider />
      <NavMenuItems />
    </Drawer>
  );
}

export default AppNavMenu;
