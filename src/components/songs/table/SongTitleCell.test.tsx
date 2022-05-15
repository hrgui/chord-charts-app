import React from "react";
import { Song } from "app/services/songs";
import { renderWithAppController } from "testUtils/renderWithAppProvider";
import SongTitleCell from "./SongTitleCell";
import { screen } from "@testing-library/react";

it("should be able to render a Song Link with /song/_id and name Test Song", () => {
  renderWithAppController(
    <SongTitleCell
      value="Test Song"
      data={
        {
          _id: "1",
        } as Song
      }
    />
  );
  const el = screen.getByText("Test Song") as HTMLAnchorElement;
  expect(el).toBeInTheDocument();
  expect(el.href).toMatchInlineSnapshot(`"http://localhost/song/1/view"`);
});
