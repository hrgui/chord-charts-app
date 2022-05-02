import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  darkMode: false, //
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
