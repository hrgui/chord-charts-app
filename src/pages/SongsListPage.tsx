import { SongListContainer } from "components/songs/SongsListContainer";
import Page from "lib/layout/Page";
import React from "react";

type Props = {};

const SongsListPage: React.FC<Props> = () => {
  return (
    <Page title="All Songs">
      <SongListContainer />
    </Page>
  );
};

export default SongsListPage;
