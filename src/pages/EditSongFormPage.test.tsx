import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import EditSongFormPage from "./EditSongFormPage";
import pouchDbBaseQuery from "api/rtk-api/pouchDbBaseQuery";
import userEvent from "@testing-library/user-event";
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

it("should be able to edit the song's title and save it", async () => {
  _useParams.mockReturnValue({ id: "1" });

  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: getNewSongTemplate() };
  });

  const { getByTestId, getByText, getByLabelText } = render(<EditSongFormPage />);
  await waitFor(() => expect(getByTestId("appBarTitle")).toBeInTheDocument());
  const titleInput = getByLabelText("Title");
  expect(titleInput).toBeInTheDocument();
  expect(getByLabelText("Artist")).toBeInTheDocument();
  expect(getByLabelText("Key")).toBeInTheDocument();
  expect(getByLabelText("Youtube URL")).toBeInTheDocument();

  await userEvent.clear(titleInput);
  await userEvent.type(titleInput, "Example");

  await userEvent.click(getByText("Save"));
  await waitFor(() => expect(getByText("Successfully updated song Example")).toBeInTheDocument());
});
