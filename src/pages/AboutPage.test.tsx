import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";
import AboutPage from "./AboutPage";
it("should render w/o crashing", async () => {
  const { getByText } = render(<AboutPage />);
  expect(getByText("Chord Charts App")).toBeInTheDocument();
});
