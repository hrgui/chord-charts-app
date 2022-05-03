import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "app/counter/counterSlice";
import uiStateReducer from "./core/uiStateSlice";
import darkModeMiddlware from "app/actions/darkModeMiddleware";
import { pokemonApi } from "./counter/pokemon";
import { SongApi } from "./services/songs";
import { SetlistApi } from "./services/setlists";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    uiState: uiStateReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [SongApi.reducerPath]: SongApi.reducer,
    [SetlistApi.reducerPath]: SetlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(darkModeMiddlware.middleware)
      .concat(pokemonApi.middleware)
      .concat(SongApi.middleware as any)
      .concat(SetlistApi.middleware as any),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
