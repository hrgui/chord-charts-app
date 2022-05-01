export function useAppBarActions() {
  const noop = () => {};
  return {
    toggleNavMenu: noop,
    toggleControlsPanel: noop,
    setStickyState: noop,
    setNavBarState: noop,
    toggleYoutube: noop,
  };
}
