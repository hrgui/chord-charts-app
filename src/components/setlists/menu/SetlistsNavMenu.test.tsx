import * as React from "react";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";
import SetlistNavMenu from "./SetlistsNavMenu";

test("it renders a list with setlist actions", () => {
  const { getByText } = render(<SetlistNavMenu />);
  expect(getByText("New Setlist")).toBeInTheDocument();
  expect(getByText("All Setlists")).toBeInTheDocument();
});
