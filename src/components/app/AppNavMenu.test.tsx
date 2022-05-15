import * as React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import AppNavMenu from "./AppNavMenu";

//TODO fixme dark theme location
xit("should at least have the Dark theme switch and the name of the app", () => {
  const APP_NAME = "Chord Charts";
  const { getByText } = render(<AppNavMenu />, {
    config: { appName: APP_NAME },
  });
  const el = getByText(/Dark theme/);
  expect(el).toBeInTheDocument();
  expect(getByText(/Login/)).toBeInTheDocument();
  const el2 = getByText(APP_NAME);
  expect(el2).toBeInTheDocument();
});
