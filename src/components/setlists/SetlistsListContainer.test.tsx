import { getNewSetlistTemplate } from "~/api/services/setlists";
import React from "react";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";
import { SetlistTable } from "./SetlistsListContainer";

describe("SetlistTable", () => {
  it("should be able to render an empty setlist table", () => {
    const { getByText } = render(<SetlistTable data={[]} />);
    expect(getByText("There are no setlists.")).toBeInTheDocument();
  });

  it("should be able to render a setlist row", () => {
    const setlist = getNewSetlistTemplate();
    setlist.title = "Example A";
    const { getByText } = render(<SetlistTable data={[setlist]} />);
    expect(getByText("Example A")).toBeInTheDocument();
  });
});
