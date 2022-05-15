import * as React from "react";
import { List, ListItemIcon, ListItemText, ListSubheader } from "ui/List";
import ListItemLink from "lib/layout/ListItemLink";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import MaterialSymbol from "ui/icons/MaterialSymbol";

export function SetlistsNavMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <List dense>
      <ListSubheader>{t("setlist:plural")}</ListSubheader>
      <ListItemLink to="/setlist/new">
        <ListItemIcon>
          <MaterialSymbol icon="post_add" />
        </ListItemIcon>
        <ListItemText primary={t("setlist:action/new_setlist")} />
      </ListItemLink>
      <ListItemLink to="/setlists">
        <ListItemIcon>
          <MaterialSymbol icon="queue_music" />
        </ListItemIcon>
        <ListItemText primary={t("setlist:action/list_setlist")} />
      </ListItemLink>
    </List>
  );
}

export default SetlistsNavMenu;
