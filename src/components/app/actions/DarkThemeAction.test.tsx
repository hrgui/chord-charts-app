import { renderWithAppProvider as render } from "~/testUtils/renderWithAppProvider";
import DarkThemeAction from "./DarkThemeAction";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  CHORD_CHARTS_DARK_MODE_KEY,
  getDarkModeInitialState,
} from "~/store/uiStateSlice";
import { createStore } from "~/store";
import { vi } from "vitest";

afterEach(() => {
  window.localStorage.setItem(CHORD_CHARTS_DARK_MODE_KEY, "false");
});

it("should render the component, when clicking, should toggle the dark mode", () => {
  const { getByText } = render(<DarkThemeAction />);
  const el = getByText(/Dark theme: Off/i);
  expect(el).toBeInTheDocument();

  act(() => {
    fireEvent.click(el);
  });
  const el2 = getByText(/Dark theme: On/i);
  expect(el2).toBeInTheDocument();
});

it("should be set to whatever the local storage is saying (true === On)", () => {
  window.matchMedia = vi.fn().mockReturnValueOnce({ matches: false });
  window.localStorage.setItem(CHORD_CHARTS_DARK_MODE_KEY, "true");
  const { getByText } = render(<DarkThemeAction />, {
    store: createStore({
      uiState: {
        darkMode: getDarkModeInitialState(),
      },
    }),
  });
  const el = getByText(/Dark theme: On/i);
  expect(el).toBeInTheDocument();
});

it("should be set to whatever the local storage is saying (false === Off) and matchMedia is returning false", () => {
  const { getByText } = render(<DarkThemeAction />);
  const el = getByText(/Dark theme: Off/i);
  expect(el).toBeInTheDocument();
});
