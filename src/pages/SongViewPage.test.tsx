import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import SongViewPage from "./SongViewPage";
import pouchDbBaseQuery from "api/rtk-api/pouchDbBaseQuery";
import { waitFor } from "@testing-library/react";
import { getNewSongTemplate } from "api/services/songs";
import { useParams } from "react-router-dom";

const _pouchDbBaseQuery = pouchDbBaseQuery as jest.Mock;
const _useParams = useParams as jest.Mock;

jest.mock("api/rtk-api/pouchDbBaseQuery");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

it("should be able to view the song", async () => {
  _useParams.mockReturnValue({ id: "1" });
  const song = getNewSongTemplate();
  song.title = "Example";

  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: song };
  });

  const { getByText } = render(<SongViewPage />);
  await waitFor(() => expect(getByText("Example | Untitled")).toBeInTheDocument());
  expect(getByText("Sample test")).toBeInTheDocument();
});
