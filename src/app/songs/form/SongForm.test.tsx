import * as React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppProvider";
import SongForm from "./SongForm";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

//TODO fixme

const wait = () => {};

test.skip("it should render a form without any values if given none", () => {
  const onSubmit = jest.fn();
  const { getByText } = render(<SongForm data={{}} onSubmit={onSubmit} />);
  expect(getByText(/Save/)).toBeInTheDocument();
});

it.skip("should not allow any submits with everything empty", async () => {
  const onSubmit = jest.fn();
  const { getByText, debug } = render(<SongForm data={{}} onSubmit={onSubmit} />);
  const saveBtn = getByText(/Save/);
  expect(saveBtn).toBeInTheDocument();
  act(() => {
    fireEvent.click(saveBtn);
  });
  await wait();
  expect(onSubmit).not.toHaveBeenCalled();
});

test.skip("it should render a form with values if given none initially but after was given values, and you can click on submit", async () => {
  const onSubmit = jest.fn();
  const { getByText, rerender, debug } = render(<SongForm data={{}} onSubmit={onSubmit} />);
  const saveBtn = getByText(/Save/);
  expect(saveBtn).toBeInTheDocument();

  rerender(<SongForm data={{ title: "My Song", key: "C", artist: "Me" }} onSubmit={onSubmit} />);

  act(() => {
    fireEvent.click(saveBtn);
  });
  await wait();

  expect(onSubmit).toHaveBeenCalled();
  expect(onSubmit.mock.calls[0][0]).toEqual({
    title: "My Song",
    key: "C",
    artist: "Me",
  });
});
