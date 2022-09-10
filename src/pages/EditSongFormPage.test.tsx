import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "react-router-dom";
import { vi } from "vitest";
import type { Mock } from "vitest";

import pouchDbBaseQuery from "~/api/rtk-api/pouchDbBaseQuery";
import { getNewSongTemplate } from "~/api/services/songs";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import EditSongFormPage from "./EditSongFormPage";

const _pouchDbBaseQuery = pouchDbBaseQuery as Mock;
const _useParams = useParams as Mock;

vi.mock("api/rtk-api/pouchDbBaseQuery");

vi.mock("react-router-dom", async () => {
  const router = await vi.importActual<any>("react-router-dom");

  return { ...router, useParams: vi.fn() };
});

it("should be able to edit the song's title and save it", async () => {
  _useParams.mockReturnValue({ id: "1" });

  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: getNewSongTemplate() };
  });

  const { getByTestId, getByText, getByLabelText } = render(
    <EditSongFormPage />
  );
  await waitFor(() => expect(getByTestId("appBarTitle")).toBeInTheDocument());
  const titleInput = getByLabelText("Title");
  expect(titleInput).toBeInTheDocument();
  expect(getByLabelText("Artist")).toBeInTheDocument();
  expect(getByLabelText("Key")).toBeInTheDocument();
  expect(getByLabelText("Youtube URL")).toBeInTheDocument();

  await userEvent.clear(titleInput);
  await userEvent.type(titleInput, "Example");

  await userEvent.click(getByText("Save"));
  await waitFor(() =>
    expect(getByText("Successfully updated song Example")).toBeInTheDocument()
  );
});
