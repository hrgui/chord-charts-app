import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import NewSongFormPage from "./NewSongFormPage";
import pouchDbBaseQuery from "api/rtk-api/pouchDbBaseQuery";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { vi } from "vitest";
import type { Mock } from "vitest";

const _pouchDbBaseQuery = pouchDbBaseQuery as Mock;

vi.mock("api/rtk-api/pouchDbBaseQuery");

it("should render w/o crashing", async () => {
  const { getByTestId, getByLabelText } = render(<NewSongFormPage />);
  expect(getByTestId("appBarTitle")).toBeInTheDocument();
  expect(getByLabelText("Title")).toBeInTheDocument();
  expect(getByLabelText("Artist")).toBeInTheDocument();
  expect(getByLabelText("Key")).toBeInTheDocument();
  expect(getByLabelText("Youtube URL")).toBeInTheDocument();
});

it("should be able to create a song", async () => {
  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: {} };
  });

  const { getByTestId, getByText, getByLabelText } = render(<NewSongFormPage />);
  expect(getByTestId("appBarTitle")).toBeInTheDocument();
  const titleInput = getByLabelText("Title");
  expect(titleInput).toBeInTheDocument();
  expect(getByLabelText("Artist")).toBeInTheDocument();
  expect(getByLabelText("Key")).toBeInTheDocument();
  expect(getByLabelText("Youtube URL")).toBeInTheDocument();

  await userEvent.clear(titleInput);
  await userEvent.type(titleInput, "Example");

  await userEvent.click(getByText("Save"));
  await waitFor(() => expect(getByText("Successfully created song Example")).toBeInTheDocument());
});
