import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import NewSongFormPage from "./NewSongFormPage";
it("should render w/o crashing", async () => {
  const { getByTestId, getByLabelText } = render(<NewSongFormPage />);
  expect(getByTestId("appBarTitle")).toBeInTheDocument();
  expect(getByLabelText("Title")).toBeInTheDocument();
  expect(getByLabelText("Artist")).toBeInTheDocument();
  expect(getByLabelText("Key")).toBeInTheDocument();
  expect(getByLabelText("Youtube URL")).toBeInTheDocument();
});
