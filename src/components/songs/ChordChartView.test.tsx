import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import ChordChartView from "./ChordChartView";

test("basic usage", () => {
  const { queryByText } = render(<ChordChartView value={`A B C \n Test`} />);
  expect(queryByText("A")).not.toBeNull();
  expect(queryByText("B")).not.toBeNull();
  expect(queryByText("C")).not.toBeNull();
  expect(queryByText("Test")).not.toBeNull();
});

test("when an override key is passed in, it transposes the chords to that key", () => {
  const { queryByText, rerender } = render(
    <ChordChartView songKey={"C"} value={`A B C \n Test`} />
  );
  expect(queryByText("A")).not.toBeNull();
  expect(queryByText("B")).not.toBeNull();
  expect(queryByText("C")).not.toBeNull();
  expect(queryByText("Test")).not.toBeNull();

  rerender(
    <ChordChartView value={`A B C \n Test`} songKey={"C"} overrideKey={`D`} />
  );
  expect(queryByText("B")).not.toBeNull();
  expect(queryByText("C#")).not.toBeNull();
  expect(queryByText("D")).not.toBeNull();
  expect(queryByText("Test")).not.toBeNull();
});

test("chordsDisabled should delete the chords", () => {
  const { queryByText } = render(
    <ChordChartView chordsDisabled value={`A B C \n Test`} />
  );
  expect(queryByText("A")).toBeNull();
  expect(queryByText("B")).toBeNull();
  expect(queryByText("C")).toBeNull();
  expect(queryByText("Test")).not.toBeNull();
});

test("lyricsDisabled should delete the lyrics", () => {
  const { queryByText } = render(
    <ChordChartView lyricsDisabled value={`A B C \n Test`} />
  );
  expect(queryByText("A")).not.toBeNull();
  expect(queryByText("B")).not.toBeNull();
  expect(queryByText("C")).not.toBeNull();
  expect(queryByText("Test")).toBeNull();
});
