import * as React from "react";
import ListItemLink from "lib/layout/ListItemLink";
import ActionsMenu from "lib/table/ActionsMenu";
import { ListItem, ListItemIcon, List, ListItemText } from "ui/List";
import { useUserData } from "lib/hooks/useUserData";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MaterialSymbol from "ui/icons/MaterialSymbol";

interface SetlistActionsProps {
  setlist?: any;
  addToSetlistMode?: boolean;
  song_id?: string;
  onRequestClose?: () => any;
}

function SetlistActionsList({
  id,
  name,
  addToSetlistMode,
  song_id,
  onRequestClose,
}: {
  id;
  name;
  addToSetlistMode?;
  song_id?;
  onRequestClose?;
}) {
  const user = useUserData();
  const deleteSetlist = () => {};
  const { t } = useTranslation();
  const addToSetlist = () => {};
  const enqueueSnackbar = () => {};
  const navigate = useNavigate();

  if (addToSetlistMode) {
    return (
      <List dense>
        <ListItem
          button
          onClick={async (e) => {
            await addToSetlist();
            enqueueSnackbar(t("song:action_success/add_to_setlist", { name }), {
              variant: "success",
            });
            onRequestClose();
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
            await addToSetlist();
            enqueueSnackbar(t("song:action_success/add_to_setlist", { name }), {
              variant: "success",
            });
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
    <List dense>
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
          const { extensions } = await deleteSetlist({
            variables: { id: id },
          });

          if (extensions && extensions.cancelled) {
            return;
          }

          window.location.href = "/setlists";
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
      <SetlistActionsList
        id={props.setlist.id}
        name={props.setlist.title}
        addToSetlistMode={props.addToSetlistMode}
        song_id={props.song_id}
        onRequestClose={props.onRequestClose}
      />
    </ActionsMenu>
  );
};

export default SetlistActions;
