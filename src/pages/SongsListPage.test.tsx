import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import SongsListPage from "./SongsListPage";
import pouchDbBaseQuery from "api/rtk-api/pouchDbBaseQuery";
import { getNewSongTemplate } from "api/services/songs";
import { screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import type { Mock } from "vitest";

vi.mock("api/rtk-api/pouchDbBaseQuery");

const _pouchDbBaseQuery = pouchDbBaseQuery as Mock;
it("should render at least one song in the list w/o crashing", async () => {
  const song = getNewSongTemplate();
  song.title = "Example";

  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: { docs: [song] } };
  });

  render(<SongsListPage />);
  await waitFor(() => expect(screen.getByText("Example")).toBeInTheDocument());
});
