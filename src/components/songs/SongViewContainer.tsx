import * as React from "react";
import Loading from "lib/layout/Loading";
import SongView from "./SongView";
import { useGetSongQuery } from "app/services/songs";
import Page from "lib/layout/Page";
import { Setlist } from "app/services/setlists";

interface SongViewContainerProps {
  id: string;
  setlist?: Setlist;
  isActiveInSetlist?: boolean;
  settings?: any;
  onChangeSettings?: any;
  drawerChildren?: React.ReactNode;
}

export const SongViewContainer: React.FC<SongViewContainerProps> = (props) => {
  const { id } = props;
  const { isLoading, error: isError, data } = useGetSongQuery(id);
  const {
    setlist,
    isActiveInSetlist,
    settings,
    onChangeSettings = () => null,
    drawerChildren,
  } = props;

  if (setlist && !isActiveInSetlist) {
    return null;
  }

  if (isLoading) {
    return (
      <Page title="Loading">
        <Loading />
      </Page>
    );
  }

  function getTitle() {
    const songTitle = `${data?.title} | ${data?.artist}` || `Song ${id}`;
    return setlist ? `${setlist.title} - ${songTitle}` : songTitle;
  }

  return (
    <SongView
      pageTitle={getTitle()}
      isLoading={isLoading}
      isError={isError}
      data={data}
      settings={settings}
      onChangeSettings={onChangeSettings}
      drawerChildren={drawerChildren}
    />
  );
};
