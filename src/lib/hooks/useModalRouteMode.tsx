import { Navigate, useLocation, useNavigate } from "react-router-dom";

export function useModalRouteMode() {
  const location = useLocation();
  const isModalMode = (location.state as any)?.background;
  const navigate = useNavigate();

  function handleNavigate(loc, state?) {
    if (isModalMode) {
      navigate(-1);
      return;
    }

    return navigate(loc, state);
  }

  return [isModalMode, handleNavigate];
}
