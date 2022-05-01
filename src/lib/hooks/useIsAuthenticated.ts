export function useIsAuthenticated(): [boolean, boolean, any] {
  const { isLoading, data } = { isLoading: false, data: {} };

  return [isLoading, !isLoading && !!data, !isLoading && data];
}
