import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import NewSetlistFormPage from "./NewSetlistFormPage";
import pouchDbBaseQuery from "api/rtk-api/pouchDbBaseQuery";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import type { Mock } from "vitest";

const _pouchDbBaseQuery = pouchDbBaseQuery as Mock;

vi.mock("api/rtk-api/pouchDbBaseQuery");

it("should be able to render a setlist form without crashing even if there are no songs", async () => {
  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: { docs: [] } };
  });
  const { getByTestId, getByLabelText, getByText } = render(<NewSetlistFormPage />);
  expect(getByTestId("appBarTitle")).toBeInTheDocument();
  expect(getByLabelText("Setlist Title")).toBeInTheDocument();
  expect(getByLabelText("Setlist Owner")).toBeInTheDocument();

  (await waitFor(() => expect(getByText("There are no songs.")))).toBeInTheDocument();
});

it("should be able to create a setlist", async () => {
  _pouchDbBaseQuery.mockImplementation(() => {
    return { data: { docs: [] } };
  });
  const { getByTestId, getByLabelText, getByText } = render(<NewSetlistFormPage />);
  expect(getByTestId("appBarTitle")).toBeInTheDocument();
  const setlistTitleInput = getByLabelText("Setlist Title");
  expect(setlistTitleInput).toBeInTheDocument();
  await userEvent.clear(setlistTitleInput);
  await userEvent.type(setlistTitleInput, "Example");
  expect(getByLabelText("Setlist Owner")).toBeInTheDocument();

  await userEvent.click(getByText("Save"));
  await waitFor(() =>
    expect(getByText("Successfully created setlist Example")).toBeInTheDocument()
  );
});
