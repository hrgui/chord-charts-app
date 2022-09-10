import { screen, waitFor } from "@testing-library/react";
import { getNewSetlistTemplate } from "~/api/services/setlists";
import React from "react";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";
import { CurrentSetlistNavMenu } from "./CurrentSetlistNavMenu";

it("should work", async () => {
  const setlist = getNewSetlistTemplate();
  setlist.title = "Example Setlist";
  render(<CurrentSetlistNavMenu setlist={setlist} />);
  await waitFor(() => {
    return expect(screen.getByText("Setlist Navigation")).toBeInTheDocument();
  });
});
