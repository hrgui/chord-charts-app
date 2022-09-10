import React from "react";
import { SetlistListContainer } from "~/components/setlists/SetlistsListContainer";
import Page from "~/ui/layout/Page";

export interface SetlistsListPageProps {
  path?: string;
  isAdmin?: boolean;
}

const SetlistsListPage: React.FC<SetlistsListPageProps> = () => {
  return (
    <Page title="All Setlists">
      <SetlistListContainer />
    </Page>
  );
};

export default SetlistsListPage;
