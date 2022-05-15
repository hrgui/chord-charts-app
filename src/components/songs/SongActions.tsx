import * as React from "react";
import toast from "react-hot-toast";
import ListItemLink from "ui/layout/ListItemLink";
import ActionsMenu from "ui/table/ActionsMenu";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Song, useDeleteSongMutation } from "api/services/songs";
import { List, ListItem, ListItemIcon, ListItemText } from "ui/List";
import MaterialSymbol from "ui/icons/MaterialSymbol";
import ErrorAlert from "ui/alert/ErrorAlert";

interface SongActionsProps {
  song?: Song;
  addToSetlistMode?: boolean;
  onAddSong: (song) => any;
  onRequestClose?: () => any;
}

function SongActionsList({ song, onRequestClose }: { song: Song; onRequestClose?: () => void }) {
  const [deleteSong] = useDeleteSongMutation();
  const { t } = useTranslation();
  const location = useLocation();
  const id = song._id;

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
          const promise = deleteSong(song);
          await toast.promise(promise, {
            loading: t("song:action/delete/submitting", { title: song.title }),
            success: t("song:action/delete/submitted", { title: song.title }),
            error: (err) => <ErrorAlert message={t("song:action/delete/error")} error={err} />,
          });
          onRequestClose?.();
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
        }}
        state={{ background: location }}
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
      {({ onClose }) => {
        return <SongActionsList song={props.song!} onRequestClose={onClose} />;
      }}
    </ActionsMenu>
  );
};

export default SongActions;
