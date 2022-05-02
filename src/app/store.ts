import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "app/counter/counterSlice";
import uiStateReducer from "./core/uiStateSlice";
import darkModeMiddlware from "app/actions/darkModeMiddleware";
import { pokemonApi } from "./counter/pokemon";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    uiState: uiStateReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(darkModeMiddlware.middleware).concat(pokemonApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
