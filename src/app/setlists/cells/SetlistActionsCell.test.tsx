import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppProvider";
import SetlistActionsCell from "./SetlistActionsCell";

test("renders setlist actions given a setlist", () => {
  const { container } = render(<SetlistActionsCell data={{}} />);
  expect(container).toMatchSnapshot();
});
