import { screen } from "@testing-library/react";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";
import AppNavMenu from "./AppNavMenu";

it("should at least have the Dark theme switch and the name of the app", () => {
  render(<AppNavMenu />);
  expect(screen.getByText("Chord Charts")).toBeInTheDocument();
  expect(screen.getByText("New Song")).toBeInTheDocument();
  expect(screen.getByText("All Songs")).toBeInTheDocument();

  expect(screen.getByText("All Setlists")).toBeInTheDocument();
  expect(screen.getByText("New Setlist")).toBeInTheDocument();

  expect(screen.getByText("Dark theme: Off")).toBeInTheDocument();
});
