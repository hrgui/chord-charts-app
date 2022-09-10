import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import SetlistTitleCell from "./SetlistTitleCell";
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
    <div
      style="position: fixed; z-index: 9999; top: 16px; left: 16px; right: 16px; bottom: 16px; pointer-events: none;"
    />
  </div>
</DocumentFragment>
`);
});
