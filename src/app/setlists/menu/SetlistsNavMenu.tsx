import * as React from "react";
import { List, ListItemIcon, ListItemText, ListSubheader } from "ui/List";
import ListItemLink from "lib/layout/ListItemLink";
import PostAdd from "@material-ui/icons/PostAdd";
import QueueMusic from "@material-ui/icons/QueueMusic";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export function SetlistsNavMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <List dense>
      <ListSubheader>{t("setlist:plural")}</ListSubheader>
      <ListItemLink to="/setlist/new" state={{ background: location }}>
        <ListItemIcon>
          <PostAdd />
        </ListItemIcon>
        <ListItemText primary={t("setlist:action/new_setlist")} />
      </ListItemLink>
      <ListItemLink to="/setlists">
        <ListItemIcon>
          <QueueMusic />
        </ListItemIcon>
        <ListItemText primary={t("setlist:action/list_setlist")} />
      </ListItemLink>
    </List>
  );
}

export default SetlistsNavMenu;
