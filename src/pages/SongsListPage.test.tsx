import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import SongsListPage from "./SongsListPage";
import pouchDbBaseQuery from "api/rtk-api/pouchDbBaseQuery";
import { getNewSongTemplate } from "api/services/songs";
import { screen, waitFor } from "@testing-library/react";

jest.mock("api/rtk-api/pouchDbBaseQuery");

const _pouchDbBaseQuery = pouchDbBaseQuery as jest.Mock;
it("should render at least one song in the list w/o crashing", async () => {
  const song = getNewSongTemplate();
  song.title = "Example";

  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: { docs: [song] } };
  });

  render(<SongsListPage />);
  await waitFor(() => expect(screen.getByText("Example")).toBeInTheDocument());
});
