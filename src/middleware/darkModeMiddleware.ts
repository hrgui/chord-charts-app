import { createListenerMiddleware } from "@reduxjs/toolkit";

import type { RootState } from "~/store";
import {
  CHORD_CHARTS_DARK_MODE_KEY,
  toggleDarkMode,
} from "~/store/uiStateSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: toggleDarkMode,
  effect: async (_, listenerApi) => {
    const state: RootState = listenerApi.getState() as RootState;
    localStorage.setItem(
      CHORD_CHARTS_DARK_MODE_KEY,
      state.uiState.darkMode ? "true" : "false"
    );
  },
});

export default listenerMiddleware;
