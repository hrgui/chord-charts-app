import { renderWithAppProvider } from "~/testUtils/renderWithAppProvider";
import ChordSelect from "./ChordSelect";

test("ChordSelect - default case - A, B, C should be an option in a ChordSelect", () => {
  const { queryByText } = renderWithAppProvider(<ChordSelect />);
  expect(queryByText("A")).toBeInTheDocument();
  expect(queryByText("B")).toBeInTheDocument();
  expect(queryByText("C")).toBeInTheDocument();
});
