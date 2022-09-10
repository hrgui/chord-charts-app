import * as React from "react";
import ListItemLink from "~/ui/layout/ListItemLink";
import { useTranslation } from "react-i18next";
import { ListItemIcon, List, ListItemText } from "~/ui/List";
import ListSubheader from "~/ui/List/ListSubheader";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";

export function SongsNavMenu() {
  const { t } = useTranslation();
  return (
    <List dense>
      <ListSubheader>{t("song:plural")}</ListSubheader>
      <ListItemLink to="/song/new">
        <ListItemIcon>
          <MaterialSymbol icon="library_add" />
        </ListItemIcon>
        <ListItemText>{t("song:action/new_song")}</ListItemText>
      </ListItemLink>
      <ListItemLink to="/songs">
        <ListItemIcon>
          <MaterialSymbol icon="library_music" />
        </ListItemIcon>
        <ListItemText>{t("song:action/list_song")}</ListItemText>
      </ListItemLink>
    </List>
  );
}

export default SongsNavMenu;
