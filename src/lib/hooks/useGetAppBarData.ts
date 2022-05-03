import { useSelector } from "react-redux";
import { RootState } from "app/store";

export function useGetAppBarData() {
  const appName = useSelector((state: RootState) => state.uiState.appName);
  const navMenuHidden = useSelector((state: RootState) => state.uiState.navMenuHidden);
  const navBarState = useSelector((state: RootState) => state.uiState.navBarState);

  return {
    appName,
    navMenuHidden,
    navBarState,
  };
}

export default useGetAppBarData;
