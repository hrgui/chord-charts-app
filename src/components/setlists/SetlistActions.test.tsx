import { getNewSetlistTemplate } from "~/api/services/setlists";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";
import SetlistActions from "./SetlistActions";

it("should render the list items for the setlist actions", () => {
  const setlist = getNewSetlistTemplate();
  const { getByText } = render(<SetlistActions setlist={setlist} />);
  expect(getByText("View")).toBeInTheDocument();
  expect(getByText("Edit")).toBeInTheDocument();
  expect(getByText("Delete")).toBeInTheDocument();
});

it("should render the list items for the setlist actions under Add to Setlist Mode", () => {
  const setlist = getNewSetlistTemplate();
  const { getByText } = render(
    <SetlistActions addToSetlistMode setlist={setlist} />
  );
  expect(getByText("Add to Setlist")).toBeInTheDocument();
  expect(getByText("Add to Setlist & Edit")).toBeInTheDocument();
});
