import { screen } from "@testing-library/react";
import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import ClearLocalDbAction from "./ClearLocalDbAction";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  jest.resetAllMocks();
});

test("should render the Clear Local DB button and will prompt a confirm once clicked", async () => {
  const mockConfirm = jest.fn();
  window.confirm = mockConfirm;

  render(<ClearLocalDbAction />);
  const btn = screen.getByText("Clear Local DB");
  expect(btn).toBeInTheDocument();

  await userEvent.click(btn);
  expect(mockConfirm.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "This will destroy everything you have created locally! Are you sure you want to do this?",
]
`);
});
