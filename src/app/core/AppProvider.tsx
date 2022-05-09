import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { store as defaultStore } from "app/store";
import { Provider } from "react-redux";
import { AppThemeProvider } from "./AppThemeProvider";
import PageLoading from "lib/layout/PageLoading";

interface AppControllerProps {
  children?;
  store?;
  config?;
  initialState?;
  history?;
  apolloProviderProps?;
  componentProviderOverrides?;
  basename?: string;
}

export function AppProvider({
  children,
  history,
  store = defaultStore,
  componentProviderOverrides = {},
  basename = "",
}: AppControllerProps) {
  const Router = !componentProviderOverrides.Router
    ? BrowserRouter
    : componentProviderOverrides.Router;

  return (
    <Suspense fallback={<PageLoading />}>
      <Provider store={store}>
        <HelmetProvider>
          <Router basename={basename} history={history}>
            <AppThemeProvider>{children}</AppThemeProvider>
          </Router>
        </HelmetProvider>
      </Provider>
    </Suspense>
  );
}

export default AppProvider;
