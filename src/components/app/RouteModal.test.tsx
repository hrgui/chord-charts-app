import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import { RouteModal } from "./RouteModal";

it("should render", () => {
  const { getByText } = render(<RouteModal open>Hello World</RouteModal>);
  expect(getByText("Hello World")).toBeInTheDocument();
});
