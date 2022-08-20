import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import SongViewPage from "./SongViewPage";
import pouchDbBaseQuery from "api/rtk-api/pouchDbBaseQuery";
import { waitFor } from "@testing-library/react";
import { getNewSongTemplate } from "api/services/songs";
import { useParams } from "react-router-dom";
import { vi } from "vitest";
import type { Mock } from "vitest";

const _pouchDbBaseQuery = pouchDbBaseQuery as Mock;
const _useParams = useParams as Mock;

vi.mock("api/rtk-api/pouchDbBaseQuery");

vi.mock("react-router-dom", async () => {
  const router = await vi.importActual<any>("react-router-dom");

  return { ...router, useParams: vi.fn() };
});

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
