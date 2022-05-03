import React from "react";
import { TextField } from "./TextField";
import { renderWithForm as render } from "testUtils/renderWithForm";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

//TODO fixme

test.skip("should render a text field that supports input change events", async () => {
  const reactEl = <TextField label="First Name" name="firstName" data-testid="firstName" />;
  const { getByText, getByTestId } = render(() => reactEl);

  expect(getByText("First Name")).toBeInTheDocument();
  const input_ = getByTestId("firstName");
  const input = input_.querySelector("input");

  act(() => {
    fireEvent.change(input, { target: { value: "Test" } });
  });

  expect(input.value).toEqual("Test");
});
