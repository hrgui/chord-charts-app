import * as React from "react";

import { Loading } from "~/ui/layout/Loading";

import { SetlistSongsViewer } from "./SetlistSongsViewer";

interface SetlistViewProps {
  isLoading?: boolean;
  isError?: any;
  data?: any;
  songIndex?: any;
  onIndexChange?: (index) => any;
  onSaveSetlistSettings?: any;
  hasUnsavedSettings?: boolean;
  isLyrics?: boolean;
  title?: string;
}

const SetlistView: React.FC<SetlistViewProps> = (props) => {
  const {
    title = "",
    isLoading,
    isError,
    data = {},
    songIndex = 0,
    onSaveSetlistSettings,
    hasUnsavedSettings,
    isLyrics,
  } = props;
  const { songs = [], settings = {} } = data || {};

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error(isError);
    return null;
  }

  return (
    <>
      <SetlistSongsViewer
        title={title}
        setlist={data}
        isLyrics={isLyrics}
        hasUnsavedSettings={hasUnsavedSettings}
        onSaveSetlistSettings={onSaveSetlistSettings}
        onIndexChange={props.onIndexChange}
        songs={songs}
        songIndex={songIndex}
        settings={settings}
        isLoading={isLoading}
      />
    </>
  );
};

export default SetlistView;
