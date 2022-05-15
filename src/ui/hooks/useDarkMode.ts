import { useSelector } from "react-redux";
import { RootState } from "store";
export function useDarkMode() {
  return useSelector((state: RootState) => state.uiState.darkMode);
}
