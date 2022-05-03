import * as React from "react";
import { useParams } from "react-router-dom";
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
}

export const SongViewContainer: React.FC<SongViewContainerProps> = (props) => {
  console.log("SongViewContainer", props);
  const { id } = props;
  const { isLoading, error: isError, data } = useGetSongQuery(id);
  const { setlist, isActiveInSetlist, settings, onChangeSettings = () => null } = props;

  if (setlist && !isActiveInSetlist) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  function getTitle() {
    const songTitle = data?.title || `Song ${id}`;
    return setlist ? `${setlist.title} - ${songTitle}` : songTitle;
  }

  return (
    <Page title={getTitle()}>
      <SongView
        isLoading={isLoading}
        isError={isError}
        data={data}
        settings={settings}
        onChangeSettings={onChangeSettings}
      />
    </Page>
  );
};

const SongViewPage = () => {
  const { id } = useParams<any>();

  return <SongViewContainer id={id} />;
};

export default SongViewPage;
