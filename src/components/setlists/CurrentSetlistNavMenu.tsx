import toast from "react-hot-toast";
import ListItemLink from "~/ui/layout/ListItemLink";
import ChordSelect from "~/components/songs/ChordSelect";
import { useTranslation } from "react-i18next";
import { useGetSongsQuery } from "~/api/services/songs";
import {
  ListSubheader,
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
} from "~/ui/List";
import Divider from "~/ui/Divider";
import Skeleton from "~/ui/Skeleton";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import {
  Setlist,
  SetlistSong,
  useDeleteSetlistMutation,
} from "~/api/services/setlists";
import ErrorAlert from "~/ui/alert/ErrorAlert";

export function CurrentSetlistNavMenuPlaceholder() {
  return <div id="currentSetlistNavMenu" />;
}

export interface CurrentSetlistNavMenuProps {
  setlist: Setlist;
  title?: string;
  onChangeSettings?: any;
  /** @deprecated */
  settings?;
  hasUnsavedSettings?;
  onSaveSetlistSettings?;
}

type SetlistNavigationProps = {
  id: string;
  setlistSongs: SetlistSong[];
  onChangeSettings: (settings, song) => void;
};

export function SetlistNavigation({
  id,
  setlistSongs: songs,
  onChangeSettings,
}: SetlistNavigationProps) {
  const { t } = useTranslation();
  const { data, isLoading: loading } = useGetSongsQuery(
    {
      _id: { $in: songs.map((s) => s._id) },
    },
    { skip: songs.length === 0 }
  );

  const fetchedSongs = data;

  function handleChangeSettings(x, id) {
    onChangeSettings({ overrideKey: x }, { id });
  }

  return (
    <List>
      <ListSubheader>{t("setlist:menu/navigation/title")}</ListSubheader>
      {songs.map((song, idx) => {
        const hidx = idx + 1;
        const sid = song._id;
        const fetchedSong = fetchedSongs?.filter((song) => song._id === sid)[0];

        return (
          <ListItemLink to={`/setlist/${id}/${hidx}`} key={hidx}>
            {loading && !fetchedSong ? (
              <Skeleton width={Math.floor(Math.random() * 426)} height={16} />
            ) : (
              <>
                <ListItemText
                  primary={`${hidx}. ${fetchedSong?.title}`}
                ></ListItemText>
                <ChordSelect
                  onChange={() => handleChangeSettings(e.target.value, sid)}
                  value={song.settings.overrideKey || fetchedSong?.key}
                />
              </>
            )}
          </ListItemLink>
        );
      })}
    </List>
  );
}

export function CurrentSetlistNavMenu(props: CurrentSetlistNavMenuProps) {
  const {
    title = "",
    onChangeSettings,
    settings = {},
    onSaveSetlistSettings,
    hasUnsavedSettings,
    setlist,
  } = props;
  const { t } = useTranslation();
  const { _id: id, songs = [] } = props.setlist;
  const [deleteSetlist] = useDeleteSetlistMutation();

  return (
    <List dense>
      <ListSubheader>{title}</ListSubheader>
      <Divider />
      <ListSubheader>{t("setlist:menu/controls/title")}</ListSubheader>
      {hasUnsavedSettings && (
        <ListItem button onClick={() => onSaveSetlistSettings(settings)}>
          <ListItemIcon>
            <MaterialSymbol icon="call_merge" />
          </ListItemIcon>
          {t("save_changes")}
        </ListItem>
      )}
      <ListItemLink to={`/setlist/${id}/edit`}>
        <ListItemIcon>
          <span className="material-symbols-outlined">edit</span>
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
        }}
      >
        <ListItemIcon>
          <MaterialSymbol icon="delete" />
        </ListItemIcon>
        <ListItemText primary={t("delete")} />
      </ListItem>
      <Divider />
      <SetlistNavigation
        id={id!}
        onChangeSettings={onChangeSettings}
        setlistSongs={songs}
      />
    </List>
  );
}
