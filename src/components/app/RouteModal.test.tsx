import React from "react";
import { RouteModal } from "./RouteModal";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";

it("should render", () => {
  const { getByText } = render(<RouteModal open>Hello World</RouteModal>);
  expect(getByText("Hello World")).toBeInTheDocument();
});
