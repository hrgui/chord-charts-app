import * as React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  Setlist,
  useDeleteSetlistMutation,
  useUpdateSetlistMutation,
} from "~/api/services/setlists";
import { Song } from "~/api/services/songs";
import ErrorAlert from "~/ui/alert/ErrorAlert";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import ListItemLink from "~/ui/layout/ListItemLink";
import { ListItem, ListItemIcon, List, ListItemText } from "~/ui/List";
import ActionsMenu from "~/ui/table/ActionsMenu";

interface SetlistActionsProps {
  setlist: Setlist;
  addToSetlistMode?: boolean;
  song?: Song;
  onRequestClose?: () => any;
}

function SetlistActionsList({
  song,
  setlist,
  addToSetlistMode,
  onRequestClose,
}: SetlistActionsProps) {
  const [deleteSetlist] = useDeleteSetlistMutation();
  const [updateSetlist] = useUpdateSetlistMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const id = setlist._id;
  const song_id = song?._id;
  const addToSetlist = async (song_id) => {
    const values: Setlist = {
      ...setlist,
      songs: [
        ...setlist.songs,
        { _id: song_id, settings: { overrideKey: song?.key } },
      ],
    };
    const promise = updateSetlist(values);
    await toast.promise(promise, {
      loading: t("setlist:action/edit/submitting", { title: values.title }),
      success: t("setlist:action/edit/submitted", { title: values.title }),
      error: (err) => (
        <ErrorAlert message={t("setlist:action/edit/error")} error={err} />
      ),
    });
  };

  if (addToSetlistMode) {
    return (
      <List dense className="bg-base-200 rounded-box shadow-sm">
        <ListItem
          button
          onClick={async () => {
            await addToSetlist(song_id);
            onRequestClose?.();
          }}
        >
          <ListItemIcon>
            <MaterialSymbol icon="playlist_add" />
          </ListItemIcon>
          <ListItemText primary={t("song:action/add_to_setlist")} />
        </ListItem>
        <ListItem
          button
          onClick={async () => {
            await addToSetlist(song_id);
            navigate(`/setlist/${id}/edit`);
          }}
        >
          <ListItemIcon>
            <MaterialSymbol icon="edit" />
          </ListItemIcon>
          <ListItemText primary={t("song:action/add_to_setlist_and_edit")} />
        </ListItem>
      </List>
    );
  }

  return (
    <List dense className="bg-base-200 rounded-box shadow-sm">
      <ListItemLink to={`/setlist/${id}`}>
        <ListItemIcon>
          <MaterialSymbol icon="pageview" />
        </ListItemIcon>
        <ListItemText primary={t("view")} />
      </ListItemLink>
      <ListItemLink to={`/setlist/${id}/edit`}>
        <ListItemIcon>
          <MaterialSymbol icon="edit" />
        </ListItemIcon>
        <ListItemText primary={t("edit")} />
      </ListItemLink>
      <ListItem
        button
        onClick={async () => {
          const promise = deleteSetlist(setlist);
          await toast.promise(promise, {
            loading: t("setlist:action/delete/submitting", {
              title: setlist.title,
            }),
            success: t("setlist:action/delete/submitted", {
              title: setlist.title,
            }),
            error: (err) => (
              <ErrorAlert
                message={t("setlist:action/delete/error")}
                error={err}
              />
            ),
          });
          onRequestClose?.();
        }}
      >
        <ListItemIcon>
          <MaterialSymbol icon="delete" />
        </ListItemIcon>
        <ListItemText primary={t("delete")} />
      </ListItem>
    </List>
  );
}

const SetlistActions: React.FC<SetlistActionsProps> = (props) => {
  return (
    <ActionsMenu>
      {({ onClose }) => {
        return (
          <SetlistActionsList
            setlist={props.setlist}
            addToSetlistMode={props.addToSetlistMode}
            song={props.song}
            onRequestClose={props.onRequestClose || onClose}
          />
        );
      }}
    </ActionsMenu>
  );
};

export default SetlistActions;
