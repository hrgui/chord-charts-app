import * as React from "react";
import ListItemLink from "lib/layout/ListItemLink";
import ActionsMenu from "lib/table/ActionsMenu";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Song } from "app/services/songs";
import { List, ListItem, ListItemIcon, ListItemText } from "ui/List";
import MaterialSymbol from "ui/icons/MaterialSymbol";

interface SongActionsProps {
  song?: Song;
  addToSetlistMode?: boolean;
  onAddSong: (song) => any;
}

function SongActionsList({ id }: { id?; addToSetlistMode? }) {
  const deleteSetlist = () => {};
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <List dense className="bg-base-200 rounded-box shadow-sm">
      <ListItemLink to={`/song/${id}/view`}>
        <ListItemIcon>
          <MaterialSymbol icon="pageview" />
        </ListItemIcon>
        <ListItemText primary={t("view")} />
      </ListItemLink>
      <ListItemLink to={`/song/${id}/edit`}>
        <ListItemIcon>
          <MaterialSymbol icon="edit" />
        </ListItemIcon>
        <ListItemText primary={t("edit")} />
      </ListItemLink>
      <ListItem
        onClick={async () => {
          alert("DELETE not implemented yet");
        }}
      >
        <ListItemIcon>
          <MaterialSymbol icon="delete" />
        </ListItemIcon>
        <ListItemText primary={t("delete")} />
      </ListItem>
      <ListItemLink
        to={{
          pathname: "/setlist/add",
          search: `?song_id=${id}`,
          state: { background: location },
        }}
      >
        <ListItemIcon>
          <MaterialSymbol icon="playlist_add" />
        </ListItemIcon>
        <ListItemText primary={t("song:action/add_to_setlist")} />
      </ListItemLink>
    </List>
  );
}

const SongActions: React.FC<SongActionsProps> = (props) => {
  if (props.addToSetlistMode) {
    return (
      <button className="btn" onClick={(e) => props.onAddSong(props.song)}>
        Add
      </button>
    );
  }

  return (
    <ActionsMenu>
      <SongActionsList id={props.song?._id} addToSetlistMode={props.addToSetlistMode} />
    </ActionsMenu>
  );
};

export default SongActions;
