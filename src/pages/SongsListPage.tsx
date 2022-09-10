import React from "react";

import { SongListContainer } from "~/components/songs/SongsListContainer";
import Page from "~/ui/layout/Page";

type Props = {};

const SongsListPage: React.FC<Props> = () => {
  return (
    <Page title="All Songs">
      <SongListContainer />
    </Page>
  );
};

export default SongsListPage;
