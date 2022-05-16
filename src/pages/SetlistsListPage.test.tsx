import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import SetlistsListPage from "./SetlistsListPage";
import pouchDbBaseQuery from "api/rtk-api/pouchDbBaseQuery";
import { screen, waitFor } from "@testing-library/react";
import { getNewSetlistTemplate } from "api/services/setlists";

jest.mock("api/rtk-api/pouchDbBaseQuery");

const _pouchDbBaseQuery = pouchDbBaseQuery as jest.Mock;
it("should render at least one setlist in the list w/o crashing", async () => {
  const setlist = getNewSetlistTemplate();
  setlist.title = "Example";

  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: { docs: [setlist] } };
  });

  render(<SetlistsListPage />);
  await waitFor(() => expect(screen.getByText("Example")).toBeInTheDocument());
});
