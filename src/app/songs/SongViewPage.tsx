import * as React from "react";
import { useParams } from "react-router-dom";
import Loading from "lib/layout/Loading";
import SongView from "./SongView";
import { useGetSongQuery } from "app/services/songs";

interface SongViewContainerProps {
  id?: string;
  isInSetlist?: boolean;
  isActiveInSetlist?: boolean;
  settings?: any;
  onChangeSettings?: any;
}

export const SongViewContainer: React.SFC<SongViewContainerProps> = (props) => {
  const { loading: isLoading, error: isError, data } = useGetSongQuery(props.id);
  const { isInSetlist, isActiveInSetlist, settings, onChangeSettings = () => null } = props;

  if (isInSetlist && !isActiveInSetlist) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SongView
        isLoading={isLoading}
        isError={isError}
        data={data}
        settings={settings}
        onChangeSettings={onChangeSettings}
      />
    </>
  );
};

const SongViewPage = () => {
  const { id } = useParams<any>();

  return <SongViewContainer id={id} />;
};

export default SongViewPage;
