import { createApi } from "@reduxjs/toolkit/query/react";
import pouchDbBaseQuery, { ApiMethod } from "lib/rtk-api/pouchDbBaseQuery";

export interface SongSection {
  type: string;
  title?: string;
  body?: string;
}

export interface Song {
  _id?: string;
  title: string;
  key: string;
  artist: string;
  youtube: string;
  tags: string[];
  sections: SongSection[];
}

type SongsResponse = Song[];

type SongsQuery = { [name: string]: any } | void;

export const apiType = "Song";
export const SongApi = createApi({
  reducerPath: `${apiType}Api`,
  baseQuery: pouchDbBaseQuery,
  tagTypes: [apiType],
  endpoints: (build) => ({
    getSongs: build.query<SongsResponse, SongsQuery>({
      query: (listArgs) => ({
        type: apiType,
        method: ApiMethod.list,
        listArgs: listArgs as { [name: string]: any },
      }),
      transformResponse: (response) => (response as any).docs,
      // Provides a list of `Songs` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Songs` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id: id }) => ({ type: apiType, id } as const)),
              { type: apiType, id: ApiMethod.list },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Songs', id: 'LIST' }` is invalidated
            [{ type: apiType, id: ApiMethod.list }],
    }),
    addSong: build.mutation<Song, Partial<Song>>({
      query(body) {
        return {
          type: apiType,
          method: ApiMethod.create,
          body,
        };
      },
      // Invalidates all Song-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created Song could show up in any lists.
      invalidatesTags: [{ type: apiType, id: ApiMethod.list }],
    }),
    getSong: build.query<Song, string>({
      query: (id) => ({ type: apiType, method: ApiMethod.get, id }),
      providesTags: (result, error, id) => [{ type: apiType, id }],
    }),
    updateSong: build.mutation<Song, Partial<Song>>({
      query(data) {
        return {
          type: apiType,
          method: ApiMethod.update,
          body: data,
        };
      },
      // Invalidates all queries that subscribe to this Song `id` only.
      // In this case, `getSong` will be re-run. `getSongs` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id: id }) => [{ type: apiType, id }],
    }),
    deleteSong: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          type: apiType,
          method: ApiMethod.delete,
          id: id,
        };
      },
      // Invalidates all queries that subscribe to this Song `id` only.
      invalidatesTags: (result, error, id) => [{ type: apiType, id }],
    }),
  }),
});

export const {
  useAddSongMutation,
  useGetSongQuery,
  useGetSongsQuery,
  useUpdateSongMutation,
  useDeleteSongMutation,
} = SongApi;
