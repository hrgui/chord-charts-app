import * as React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import SongsNavMenu from "./SongsNavMenu";

test("it renders a list with song actions", () => {
  const { getByText } = render(<SongsNavMenu />);
  expect(getByText("New Song")).toBeInTheDocument();
  expect(getByText("All Songs")).toBeInTheDocument();
});
