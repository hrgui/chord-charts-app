import { fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";

import ChordChartTextInput from "./ChordChartTextInput";

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
