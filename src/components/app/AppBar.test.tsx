import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppProvider";
import AppBar from "./AppBar";
import { fireEvent } from "@testing-library/react";
import useGetAppBarData from "ui/hooks/useGetAppBarData";

const observeMock = {
  observe: () => null,
  disconnect: () => null, // maybe not needed
};

beforeEach(() => {
  (window as any).IntersectionObserver = jest.fn().mockImplementation(() => observeMock);
});

function TestMenuStateDisplay() {
  const { navMenuHidden } = useGetAppBarData();
  return <>{navMenuHidden ? "nav_menu_off" : "nav_menu_open"}</>;
}

test("should at least render with a menu item which can toggle the menu state", () => {
  const { getByLabelText, getByText } = render(
    <>
      <AppBar />
      <TestMenuStateDisplay />
    </>
  );
  const el = getByLabelText("Menu");
  expect(el).toBeInTheDocument();
  const el2 = getByText("nav_menu_open");
  expect(el2).toBeInTheDocument();
  fireEvent.click(el);
  expect(getByText("nav_menu_off")).toBeInTheDocument();
});

test("should show the title when passed in a title", () => {
  const { getByText } = render(
    <>
      <AppBar title={"All Songs"} />
    </>
  );
  expect(getByText("All Songs")).toBeInTheDocument();
});
