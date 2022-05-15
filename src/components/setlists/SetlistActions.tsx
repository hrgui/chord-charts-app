import * as React from "react";
import ListItemLink from "ui/layout/ListItemLink";
import ActionsMenu from "ui/table/ActionsMenu";
import { ListItem, ListItemIcon, List, ListItemText } from "ui/List";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MaterialSymbol from "ui/icons/MaterialSymbol";
import { Setlist } from "api/services/setlists";

interface SetlistActionsProps {
  setlist: Setlist;
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
  const deleteSetlist = () => {};
  const { t } = useTranslation();
  const addToSetlist = () => {};
  const navigate = useNavigate();

  if (addToSetlistMode) {
    return (
      <List dense>
        <ListItem
          button
          onClick={async (e) => {
            await addToSetlist();
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
          alert("TODO delete not implemented yet");
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
        id={props.setlist._id}
        name={props.setlist.title}
        addToSetlistMode={props.addToSetlistMode}
        song_id={props.song_id}
        onRequestClose={props.onRequestClose}
      />
    </ActionsMenu>
  );
};

export default SetlistActions;
