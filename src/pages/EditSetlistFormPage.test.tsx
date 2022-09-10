import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "react-router-dom";
import { vi } from "vitest";
import type { Mock } from "vitest";

import pouchDbBaseQuery from "~/api/rtk-api/pouchDbBaseQuery";
import { getNewSetlistTemplate, Setlist } from "~/api/services/setlists";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import EditSetlistFormPage from "./EditSetlistFormPage";

const _pouchDbBaseQuery = pouchDbBaseQuery as Mock;
const _useParams = useParams as Mock;

vi.mock("api/rtk-api/pouchDbBaseQuery");

vi.mock("react-router-dom", async () => {
  const router = await vi.importActual<any>("react-router-dom");

  return { ...router, useParams: vi.fn() };
});

it("should be able to modify the title of a setlist and save it", async () => {
  _useParams.mockReturnValue({ id: "1" });
  const setlist: Setlist = getNewSetlistTemplate();
  setlist._id = "1";
  setlist.title = "Meow";
  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: setlist };
  });

  const { getByTestId, getByLabelText, getByText } = render(
    <EditSetlistFormPage />
  );

  await waitFor(() => expect(getByTestId("appBarTitle")).toBeInTheDocument());
  const titleInput = getByLabelText("Setlist Title");
  expect(titleInput).toBeInTheDocument();
  expect(getByLabelText("Setlist Owner")).toBeInTheDocument();

  await waitFor(() =>
    expect(getByText("There are no songs.")).toBeInTheDocument()
  );
  await userEvent.type(titleInput, "2");
  await userEvent.click(getByText("Save"));

  await waitFor(() =>
    expect(getByText("Successfully updated setlist Meow2")).toBeInTheDocument()
  );
});
