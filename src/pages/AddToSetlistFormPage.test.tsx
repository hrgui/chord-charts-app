import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import AddToSetlistFormPage from "./AddToSetlistFormPage";
import useQueryParams from "hooks/useQueryParams";
import pouchDbBaseQuery, { PouchDbBaseQueryArgs } from "api/rtk-api/pouchDbBaseQuery";
import { getNewSongTemplate } from "api/services/songs";
import { waitFor } from "@testing-library/react";
import { getNewSetlistTemplate } from "api/services/setlists";

const _useQueryParams = useQueryParams as jest.Mock;
const _pouchDbBaseQuery = pouchDbBaseQuery as jest.Mock;

jest.mock("hooks/useQueryParams");
jest.mock("api/rtk-api/pouchDbBaseQuery");

it("should render w/o crashing, target song defined and target setlist defined", async () => {
  _useQueryParams.mockReturnValueOnce(new URLSearchParams("?song_id=1"));
  const targetSong = getNewSongTemplate();
  targetSong._id = "1";
  targetSong.title = "Target";

  const targetSetlist = getNewSetlistTemplate();
  targetSetlist.title = "Target Setlist";

  _pouchDbBaseQuery.mockImplementation((args: PouchDbBaseQueryArgs) => {
    if (args.type === "Song" && args.method === "get") {
      return { data: targetSong };
    }

    return { data: { docs: [targetSetlist, getNewSetlistTemplate()] } };
  });

  const { getByText } = render(<AddToSetlistFormPage />);
  await waitFor(() => expect(getByText(targetSong.title)).toBeInTheDocument());
  await waitFor(() => expect(getByText(targetSetlist.title)).toBeInTheDocument());
});
