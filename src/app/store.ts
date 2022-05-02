import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "app/counter/counterSlice";
import uiStateReducer from "./core/uiStateSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    uiState: uiStateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
