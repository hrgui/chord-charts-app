# @hrgui/chord-charts-manager

```ts
export enum NavBarState {
  main = "main",
  setlist = "setlist",
  song = "song",
}

export interface UiStateModel {
  darkMode?: boolean;
  appName;
  page;
  widthBreakpoint;
  isSticky: boolean;
  navBarState: NavBarState;
  navMenuHidden: boolean;
  controlsPanelHidden: boolean;
  youtubeHidden: boolean;
  toggleNavMenu: Action<any>;
  toggleYoutube: Action<any>;
  toggleControlsPanel: Action<any>;
  setPageInfo: Action<any, { title?; subtitle? }>;
  setNavBarState: Action<any, string>;
  resetPageInfo: Action<any>;
  setWidthBreakpoint: Action<any, string>;
  setStickyState: Action<any, boolean>;
  toggleDarkMode: Action<any>;
}
```
