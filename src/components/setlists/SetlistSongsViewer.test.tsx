import { getNewSetlistTemplate } from "~/api/services/setlists";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import { SetlistSongsViewer } from "./SetlistSongsViewer";

it("should work with no songs", () => {
  const setlist = getNewSetlistTemplate();
  const { getByText } = render(
    <SetlistSongsViewer setlist={setlist} songs={[]} />
  );
  expect(getByText("There are no songs in this setlist")).toBeInTheDocument();
});
