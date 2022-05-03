import * as React from "react";
import { List, ListItemText, Button } from "@material-ui/core";
import ListItemLink from "lib/layout/ListItemLink";
import ActionsMenu from "lib/table/ActionsMenu";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Pageview from "@material-ui/icons/Pageview";
import { ListItem, ListItemIcon } from "@material-ui/core";
import { useUserData } from "lib/hooks/useUserData";
import { useTranslation } from "react-i18next";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import { useLocation } from "react-router-dom";
import { Song } from "app/services/songs";

interface SongActionsProps {
  song?: Song;
  addToSetlistMode?: boolean;
  onAddSong: (song) => any;
}

function SongActionsList({ id, addToSetlistMode }: { id?; addToSetlistMode? }) {
  const user = useUserData();
  const deleteSetlist = () => {};
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <List dense disablePadding>
      <ListItemLink to={`/song/${id}/view`}>
        <ListItemIcon>
          <Pageview />
        </ListItemIcon>
        <ListItemText primary={t("view")} />
      </ListItemLink>
      <ListItemLink to={`/song/${id}/edit`}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText primary={t("edit")} />
      </ListItemLink>
      <ListItem
        button
        onClick={async () => {
          const { extensions } = await deleteSetlist({
            variables: { id: id },
          });

          if (extensions && extensions.cancelled) {
            return;
          }

          window.location.href = "/songs";
        }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText primary={t("delete")} />
      </ListItem>
      <ListItemLink
        to={{
          pathname: "/setlist/add",
          search: `?song_id=${id}`,
          state: { background: location },
        }}
        button
      >
        <ListItemIcon>
          <PlaylistAdd />
        </ListItemIcon>
        <ListItemText primary={t("song:action/add_to_setlist")} />
      </ListItemLink>
    </List>
  );
}

const SongActions: React.FC<SongActionsProps> = (props) => {
  if (props.addToSetlistMode) {
    return <Button onClick={(e) => props.onAddSong(props.song)}>Add</Button>;
  }

  return (
    <ActionsMenu>
      <SongActionsList id={props.song?._id} addToSetlistMode={props.addToSetlistMode} />
    </ActionsMenu>
  );
};

export default SongActions;
