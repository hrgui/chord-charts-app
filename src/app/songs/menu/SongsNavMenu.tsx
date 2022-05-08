import * as React from "react";
import ListItemLink from "lib/layout/ListItemLink";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import LibraryMusic from "@material-ui/icons/LibraryMusic";
import { useTranslation } from "react-i18next";
import { ListItemIcon, List, ListItemText } from "ui/List";
import ListSubheader from "ui/List/ListSubheader";

export function SongsNavMenu() {
  const { t } = useTranslation();
  return (
    <List dense>
      <ListSubheader>{t("song:plural")}</ListSubheader>
      <ListItemLink to="/song/new">
        <ListItemIcon>
          <LibraryAdd />
        </ListItemIcon>
        <ListItemText>{t("song:action/new_song")}</ListItemText>
      </ListItemLink>
      <ListItemLink to="/songs">
        <ListItemIcon>
          <LibraryMusic />
        </ListItemIcon>
        <ListItemText>{t("song:action/list_song")}</ListItemText>
      </ListItemLink>
    </List>
  );
}

export default SongsNavMenu;
