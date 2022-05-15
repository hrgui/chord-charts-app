import React from "react";
import { renderWithAppController as render } from "testUtils/renderWithAppProvider";
import SetlistsListPage from "./SetlistsListContainer";
import { waitFor } from "@testing-library/react";

//TODO FIXME
// no graphql anymore
const GET_SETLISTS_QUERY = "";

function createSetlist(overrides) {
  return {
    id: "1",
    title: "Setlist 1",
    leader: "Test",
    date: new Date().toISOString(),
    songs: [],
    settings: {},
    session: "english",
    notes: "",
    share: {},
    __typename: "Setlist",
    ...overrides,
  };
}

it.skip("should have 3 Setlists if i provided it 3 Setlists from the API", async () => {
  const { getByText } = render(<SetlistsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SETLISTS_QUERY,
          variables: {},
        },
        result: {
          data: {
            setlists: [
              createSetlist({ id: "1", title: "Setlist 1" }),
              createSetlist({ id: "2", title: "Setlist 2" }),
              createSetlist({ id: "3", title: "Setlist 3" }),
            ],
          },
        },
      },
    ],
  });
  await waitFor(() => {
    expect(getByText(/Setlist 1/)).toBeInTheDocument();
    expect(getByText(/Setlist 2/)).toBeInTheDocument();
    return expect(getByText(/Setlist 3/)).toBeInTheDocument();
  });
});

it.skip("should not blow up if i return back empty array", async () => {
  const { getByText } = render(<SetlistsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SETLISTS_QUERY,
        },
        result: {
          data: {
            setlists: [],
          },
        },
      },
    ],
  });
  await waitFor(() => {
    return expect(getByText(/Empty in setlists/)).toBeInTheDocument();
  });
});

it.skip("should be ok if there is a slight delay", async () => {
  const { getByText, rerender } = render(<SetlistsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SETLISTS_QUERY,
          variables: {},
        },
        delay: 10,
        result: {
          data: {
            setlists: [
              createSetlist({ id: "1", title: "Setlist 1" }),
              createSetlist({ id: "2", title: "Setlist 2" }),
              createSetlist({ id: "3", title: "Setlist 3" }),
            ],
          },
        },
      },
    ],
  });
  rerender(<SetlistsListPage />);
  await waitFor(() => {
    expect(getByText(/Setlist 1/)).toBeInTheDocument();
    expect(getByText(/Setlist 2/)).toBeInTheDocument();
    return expect(getByText(/Setlist 3/)).toBeInTheDocument();
  });
});

it.skip("should show error if there is an error", async () => {
  const { rerender, getByText } = render(<SetlistsListPage />, {
    gqlMocks: [
      {
        request: {
          query: GET_SETLISTS_QUERY,
          variables: {},
        },
        error: new Error("Some error"),
      },
    ],
  });
  rerender(<SetlistsListPage />);
  await waitFor(() => {
    return expect(getByText(/An error occurred/)).toBeInTheDocument();
  });
});
