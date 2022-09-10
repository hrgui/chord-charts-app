import { fireEvent } from "@testing-library/react";
import ChordChartTextInput from "./ChordChartTextInput";
import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";
import { vi } from "vitest";

test("ChordChartTextInput - on value change", () => {
  const onValueChange = vi.fn();
  const { container } = render(
    <ChordChartTextInput
      value={`A B C \n Test`}
      onValueChange={onValueChange}
    />
  );
  const textarea = container.querySelector("textarea");
  fireEvent.change(textarea!, { target: { value: `A B C \n Test 2` } });
  expect(onValueChange).toHaveBeenCalled();
});
