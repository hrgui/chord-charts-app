import * as React from "react";
import { SongViewContainer } from "components/songs/SongViewContainer";
import { SetlistSongPagination } from "./SetlistSongPagination";
import { CurrentSetlistNavMenu } from "./CurrentSetlistNavMenu";
import { Setlist, SetlistSong } from "app/services/setlists";
import Page from "lib/layout/Page";
import { Alert } from "react-daisyui";
import MaterialSymbol from "ui/icons/MaterialSymbol";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface SetlistSongsViewerProps {
  title?: string;
  setlist?: Setlist;
  songs: SetlistSong[];
  settings?;
  songIndex?: number;
  onIndexChange?: (index: number) => void;
  isLoading?: boolean;
  onSaveSetlistSettings?;
  hasUnsavedSettings?: boolean;
  isLyrics?: boolean;
}

export function SetlistSongsViewer({
  title,
  setlist,
  songs,
  settings,
  songIndex,
  onIndexChange,
  onSaveSetlistSettings,
  hasUnsavedSettings = false,
}: SetlistSongsViewerProps) {
  const [_settings, setSettings] = React.useState(settings || {});
  const [_hasUnSavedSettings, setHasUnsavedSettings] = React.useState(hasUnsavedSettings);
  const { t } = useTranslation();

  React.useEffect(() => {
    setHasUnsavedSettings(hasUnsavedSettings);
  }, [hasUnsavedSettings]);

  function handleChangeSettings(settingsFragment, { id }) {
    alert("THIS IS DIFFERENT NOW, TODO");
  }

  if (songs.length === 0) {
    return (
      <Page title="No Songs in Setlist">
        <div className="p-4">
          <Alert icon={<MaterialSymbol icon="warning" />} status="warning">
            {t("setlist:view/message/noSongs/header")}{" "}
            <Link className="underline hover:font-semibold" to={`/setlist/${setlist?._id}/edit`}>
              {t("setlist:view/message/noSongs/action")}
            </Link>
          </Alert>
        </div>
      </Page>
    );
  }

  return (
    <div>
      {songs.map((song, index) => (
        <SongViewContainer
          setlist={setlist}
          key={index}
          isActiveInSetlist={songIndex === index}
          id={song._id}
          settings={song}
          onChangeSettings={handleChangeSettings}
          drawerChildren={
            <>
              <CurrentSetlistNavMenu
                onChangeSettings={handleChangeSettings}
                title={title}
                setlist={setlist as Setlist}
                settings={_settings}
                hasUnsavedSettings={_hasUnSavedSettings}
                onSaveSetlistSettings={onSaveSetlistSettings}
              />
              <SetlistSongPagination
                length={songs.length}
                currentIndex={songIndex as number}
                onChange={onIndexChange}
              />
            </>
          }
        />
      ))}
    </div>
  );
}
