import { useTranslation } from "react-i18next";

import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import ListItemLink from "~/ui/layout/ListItemLink";
import { List, ListItemIcon, ListItemText, ListSubheader } from "~/ui/List";

export function SetlistsNavMenu() {
  const { t } = useTranslation();
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
