import React from "react";
import { renderWithAppController } from "testUtils/renderWithAppProvider";
import ChordSelect from "./ChordSelect";

test("ChordSelect - default case - A, B, C should be an option in a ChordSelect", () => {
  const { queryByText } = renderWithAppController(<ChordSelect />);
  expect(queryByText("A")).toBeInTheDocument();
  expect(queryByText("B")).toBeInTheDocument();
  expect(queryByText("C")).toBeInTheDocument();
});
