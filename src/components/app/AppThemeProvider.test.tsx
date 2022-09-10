import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import AppThemeProvider from "./AppThemeProvider";

test("should render exactly what you pass in since its a provider", async () => {
  const { getByText } = await render(
    <AppThemeProvider>learn react</AppThemeProvider>
  );
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
