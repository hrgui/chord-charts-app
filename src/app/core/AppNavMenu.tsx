import * as React from "react";
import ListItemLink from "lib/layout/ListItemLink";
import SongsNavMenu from "app/songs/menu/SongsNavMenu";
import SetlistsNavMenu from "app/setlists/menu/SetlistsNavMenu";
import { useAppBarActions } from "lib/hooks/useAppBarActions";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";
import Drawer from "ui/Drawer";
import { List, ListItemText, ListItemIcon, ListItem } from "ui/List";
import Divider from "ui/Divider";
import CloseIcon from "ui/icons/CloseIcon";
import { Button } from "react-daisyui";
import db from "api/db";

export interface NavMenuProps {
  classes?: any;
}

export function HomeNavMenu() {
  return (
    <List dense>
      <ListItemLink to="/">
        <ListItemIcon>
          <span className="material-symbols-outlined">home</span>
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
      <Divider />
      <List>
        <ListItem
          onClick={() => {
            const agreement = confirm(
              "This will destroy everything you have created locally! Are you sure you want to do this?"
            );
            if (!agreement) {
              return;
            }

            db.destroy();
            window.location.href = "/";
          }}
        >
          <ListItemText>Clear Local DB</ListItemText>
        </ListItem>
      </List>
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
        <Button
          onClick={toggleNavMenu}
          className="ml-auto sm:hidden"
          shape="square"
          startIcon={<CloseIcon />}
        ></Button>
      </div>
      <Divider />
      <NavMenuItems />
    </Drawer>
  );
}

export default AppNavMenu;
