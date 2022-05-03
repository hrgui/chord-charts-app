import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const CHORD_CHARTS_DARK_MODE_KEY = "CHORD_CHARTS_DARK_MODE";

function getDarkModeInitialState() {
  const prefersDarkModeInitially = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const localStoragePreference = window.localStorage.getItem(CHORD_CHARTS_DARK_MODE_KEY);

  console.log("prefersDarkModeInitially", prefersDarkModeInitially);
  console.log("localStoragePreference", localStoragePreference);

  if (localStoragePreference !== null) {
    return localStoragePreference === "true";
  } else {
    return prefersDarkModeInitially;
  }
}

export enum NavBarState {
  main = "main",
  setlist = "setlist",
  song = "song",
}

export interface UiState {
  appName: string;
  darkMode: boolean;
  navBarState: NavBarState;
  navMenuHidden: boolean;
  controlsPanelHidden: boolean;
  youtubeHidden: boolean;
}

const initialState: UiState = {
  appName: "Chord Charts",
  darkMode: getDarkModeInitialState(), //
  navBarState: NavBarState.main,
  navMenuHidden: false,
  controlsPanelHidden: true,
  youtubeHidden: true,
};

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    toggleNavMenu: (state) => {
      state.navMenuHidden = !state.navMenuHidden;
    },
    toggleYoutube: (state) => {
      state.youtubeHidden = !state.youtubeHidden;
    },
    toggleControlsPanel: (state) => {
      state.controlsPanelHidden = !state.controlsPanelHidden;
    },
    setNavBarState: (state, action: PayloadAction<NavBarState>) => {
      state.navBarState = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleNavMenu, toggleYoutube, toggleControlsPanel, setNavBarState, toggleDarkMode } =
  uiStateSlice.actions;

export default uiStateSlice.reducer;
