import { useDispatch } from "react-redux";
import {
  toggleNavMenu,
  toggleYoutube,
  toggleControlsPanel,
  setNavBarState,
  toggleDarkMode,
  NavBarState,
} from "store/uiStateSlice";

export function useAppBarActions() {
  const dispatch = useDispatch();

  return {
    toggleNavMenu: () => dispatch(toggleNavMenu()),
    toggleControlsPanel: () => dispatch(toggleControlsPanel()),
    setNavBarState: (newState: NavBarState) => dispatch(setNavBarState(newState)),
    toggleDarkMode: () => dispatch(toggleDarkMode()),
    toggleYoutube: () => dispatch(toggleYoutube()),
  };
}
