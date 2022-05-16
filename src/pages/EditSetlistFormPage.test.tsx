import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import EditSetlistFormPage from "./EditSetlistFormPage";
import pouchDbBaseQuery from "api/rtk-api/pouchDbBaseQuery";
import { waitFor } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { getNewSetlistTemplate, Setlist } from "api/services/setlists";
import userEvent from "@testing-library/user-event";

const _pouchDbBaseQuery = pouchDbBaseQuery as jest.Mock;
const _useParams = useParams as jest.Mock;

jest.mock("api/rtk-api/pouchDbBaseQuery");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

it("should be able to modify the title of a setlist and save it", async () => {
  _useParams.mockReturnValue({ id: "1" });
  const setlist: Setlist = getNewSetlistTemplate();
  setlist._id = "1";
  setlist.title = "Meow";
  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: setlist };
  });

  const { getByTestId, getByLabelText, getByText } = render(<EditSetlistFormPage />);

  await waitFor(() => expect(getByTestId("appBarTitle")).toBeInTheDocument());
  const titleInput = getByLabelText("Setlist Title");
  expect(titleInput).toBeInTheDocument();
  expect(getByLabelText("Setlist Owner")).toBeInTheDocument();

  await waitFor(() => expect(getByText("There are no songs.")).toBeInTheDocument());
  await userEvent.type(titleInput, "2");
  await userEvent.click(getByText("Save"));

  await waitFor(() => expect(getByText("Successfully updated setlist Meow2")).toBeInTheDocument());
});
