import React from "react";
import { renderWithAppProvider as render } from "testUtils/renderWithAppProvider";
import SongsListPage from "./SongsListContainer";
import { waitFor } from "@testing-library/react";

//TODO fixme
// there is no more graphql
const GET_SONGS_QUERY = "";

function createSong(overrides) {
  return {
    id: "1",
    title: "Song 1",
    youtube: "",
    tags: [],
    artist: "My Artist",
    key: "C",
    sections: [],
    share: {},
    __typename: "Song",
    ...overrides,
  };
}

it.skip("should have 3 songs if i provided it 3 songs from the API", async () => {
  const { getByText } = render(<SongsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SONGS_QUERY,
        },
        result: {
          data: {
            songs: [
              createSong({ id: "1", title: "Song 1", key: "C" }),
              createSong({ id: "2", title: "Song 2", key: "C" }),
              createSong({ id: "3", title: "Song 3", key: "C" }),
            ],
          },
        },
      },
    ],
  });
  await waitFor(() => {
    expect(getByText(/Song 1/)).toBeInTheDocument();
    expect(getByText(/Song 2/)).toBeInTheDocument();
    return expect(getByText(/Song 3/)).toBeInTheDocument();
  });
});

it.skip("should not blow up if i return empty array", async () => {
  const { getByText } = render(<SongsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SONGS_QUERY,
        },
        result: {
          data: {
            songs: [],
          },
        },
      },
    ],
  });
  await waitFor(() => expect(getByText(/Empty in songs/)).toBeInTheDocument());
});

it.skip("should be ok if there is a slight delay", async () => {
  const { getByText, rerender } = render(<SongsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SONGS_QUERY,
        },
        delay: 10,
        result: {
          data: {
            songs: [
              createSong({ id: "1", title: "Song 1", key: "C" }),
              createSong({ id: "2", title: "Song 2", key: "C" }),
              createSong({ id: "3", title: "Song 3", key: "C" }),
            ],
          },
        },
      },
    ],
  });
  rerender(<SongsListPage />);
  await waitFor(() => {
    expect(getByText(/Song 1/)).toBeInTheDocument();
    expect(getByText(/Song 2/)).toBeInTheDocument();
    return expect(getByText(/Song 3/)).toBeInTheDocument();
  });
});

it.skip("should shouw error if there is an error", async () => {
  const { getByText, rerender } = render(<SongsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SONGS_QUERY,
        },
        error: new Error("SOME ERROR"),
      },
    ],
  });
  rerender(<SongsListPage />);
  await waitFor(() => expect(getByText(/An error occurred/)).toBeInTheDocument());
});
