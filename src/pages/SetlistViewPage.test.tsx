import { waitFor } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { vi } from "vitest";
import type { Mock } from "vitest";

import pouchDbBaseQuery, {
  PouchDbBaseQueryArgs,
} from "~/api/rtk-api/pouchDbBaseQuery";
import { getNewSetlistTemplate } from "~/api/services/setlists";
import { getNewSongTemplate } from "~/api/services/songs";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import SetlistViewPage from "./SetlistViewPage";

const _pouchDbBaseQuery = pouchDbBaseQuery as Mock;
const _useParams = useParams as Mock;

vi.mock("api/rtk-api/pouchDbBaseQuery");

vi.mock("react-router-dom", async () => {
  const router = await vi.importActual<any>("react-router-dom");

  return { ...router, useParams: vi.fn() };
});

it("should be able to view the setlist with at least 1 song", async () => {
  _useParams.mockReturnValue({ id: "1" });

  const setlist = getNewSetlistTemplate();

  setlist.title = "Setlist A";
  setlist.songs = [{ _id: "1", settings: {} }];

  const song = getNewSongTemplate();
  song._id = "1";
  song.title = "Example";

  _pouchDbBaseQuery.mockImplementation((args: PouchDbBaseQueryArgs) => {
    if (args.type === "Setlist") {
      return { data: setlist };
    }

    if (args.type === "Song" && args.method === "get") {
      return { data: song };
    }

    if (args.type === "Song" && args.method === "list") {
      return { data: { docs: [song] } };
    }
  });

  const { getByText } = render(<SetlistViewPage />);
  await waitFor(() =>
    expect(getByText("Setlist A - Example | Untitled")).toBeInTheDocument()
  );
  expect(getByText("Sample test")).toBeInTheDocument();

  await waitFor(() => expect(getByText("1. Example")).toBeInTheDocument());
});
