import * as React from "react";
import SetlistTitleCell from "./SetlistTitleCell";
import { renderWithAppController as render } from "testUtils/renderWithAppProvider";

//TODO fixme snapshot flaky
test("renders setlist Title given a setlist", () => {
  const { asFragment } = render(
    <SetlistTitleCell data={{ _id: 123 }} value="Donald Duck Setlist" />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    data-theme="light"
  >
    <a
      class="link link-accent"
      href="/setlist/123"
    >
      Donald Duck Setlist
    </a>
  </div>
</DocumentFragment>
`);
});
