import { createApi } from "@reduxjs/toolkit/query/react";
import pouchDbBaseQuery, { ApiMethod } from "lib/rtk-api/pouchDbBaseQuery";

export interface Setlist {
  _id: string;
  title: string;
  date: string | Date;
  songs: string[];
  settings?: { [name: string]: string };
}

type SetlistsResponse = Setlist[];

export const apiType = "Setlist";
export const SetlistApi = createApi({
  reducerPath: `${apiType}Api`,
  baseQuery: pouchDbBaseQuery,
  tagTypes: [apiType],
  endpoints: (build) => ({
    getSetlists: build.query<SetlistsResponse, void>({
      query: () => ({ type: apiType, method: ApiMethod.list }),
      // Provides a list of `Setlists` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Setlists` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id: id }) => ({ type: apiType, id } as const)),
              { type: apiType, id: ApiMethod.list },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Setlists', id: 'LIST' }` is invalidated
            [{ type: apiType, id: ApiMethod.list }],
    }),
    addSetlist: build.mutation<Setlist, Partial<Setlist>>({
      query(body) {
        return {
          type: apiType,
          method: ApiMethod.create,
          body,
        };
      },
      // Invalidates all Setlist-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created Setlist could show up in any lists.
      invalidatesTags: [{ type: apiType, id: ApiMethod.list }],
    }),
    getSetlist: build.query<Setlist, string>({
      query: (id) => ({ type: apiType, method: ApiMethod.get, id }),
      providesTags: (result, error, id) => [{ type: apiType, id }],
    }),
    updateSetlist: build.mutation<Setlist, Partial<Setlist>>({
      query(data) {
        return {
          type: apiType,
          method: ApiMethod.update,
          body: data,
        };
      },
      // Invalidates all queries that subscribe to this Setlist `id` only.
      // In this case, `getSetlist` will be re-run. `getSetlists` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: apiType, id }],
    }),
    deleteSetlist: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          type: apiType,
          method: ApiMethod.delete,
          id: id,
        };
      },
      // Invalidates all queries that subscribe to this Setlist `id` only.
      invalidatesTags: (result, error, id) => [{ type: apiType, id }],
    }),
  }),
});

export const {
  useAddSetlistMutation,
  useGetSetlistQuery,
  useGetSetlistsQuery,
  useUpdateSetlistMutation,
  useDeleteSetlistMutation,
} = SetlistApi;
