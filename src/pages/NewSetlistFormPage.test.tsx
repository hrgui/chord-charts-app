import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import NewSetlistFormPage from "./NewSetlistFormPage";
it("should render w/o crashing", async () => {
  const { getByTestId, getByLabelText } = render(<NewSetlistFormPage />);
  expect(getByTestId("appBarTitle")).toBeInTheDocument();
  expect(getByLabelText("Setlist Title")).toBeInTheDocument();
  expect(getByLabelText("Setlist Owner")).toBeInTheDocument();
});
