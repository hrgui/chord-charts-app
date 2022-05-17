import { screen } from "@testing-library/react";
import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import NewAction from "./NewAction";
import userEvent from "@testing-library/user-event";
import { hasUserInputtedData, destroySession } from "api/db";

const _hasUserInputtedData = hasUserInputtedData as jest.Mock;
const _destroySession = destroySession as jest.Mock;

jest.mock("api/db");

afterEach(() => {
  jest.resetAllMocks();
});

describe("has data", () => {
  test("should render the New Session File button, if clicked, click yes, should delete current session", async () => {
    const mockConfirm = jest.fn();
    mockConfirm.mockReturnValueOnce(true);
    window.confirm = mockConfirm;
    _hasUserInputtedData.mockReturnValueOnce(true);

    render(<NewAction />);
    const btn = screen.getByText("New Session File");
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);
    expect(mockConfirm.mock.calls[0]).toMatchInlineSnapshot(`
  Array [
    "This will destroy everything you have created locally! Are you sure you want to do this?",
  ]
  `);
    expect(_destroySession).toHaveBeenCalled();
  });

  test("should render the New Session File button, if clicked and click no, should not delete current session", async () => {
    const mockConfirm = jest.fn();
    mockConfirm.mockReturnValueOnce(false);
    window.confirm = mockConfirm;
    _hasUserInputtedData.mockReturnValueOnce(true);

    render(<NewAction />);
    const btn = screen.getByText("New Session File");
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);
    expect(mockConfirm.mock.calls[0]).toMatchInlineSnapshot(`
  Array [
    "This will destroy everything you have created locally! Are you sure you want to do this?",
  ]
  `);
    expect(_destroySession).not.toHaveBeenCalled();
  });
});

describe("no data", () => {
  test("should render the New Session File button, should delete current session", async () => {
    const mockConfirm = jest.fn();
    mockConfirm.mockReturnValueOnce(true);
    window.confirm = mockConfirm;
    _hasUserInputtedData.mockReturnValueOnce(false);

    render(<NewAction />);
    const btn = screen.getByText("New Session File");
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);
    expect(mockConfirm).not.toHaveBeenCalled();
    expect(_destroySession).toHaveBeenCalled();
  });
});
