import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { StylesProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";

import { store } from "store";
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
}

export function AppProvider({
  children,
  history,
  componentProviderOverrides = {},
}: AppControllerProps) {
  // const Router: any = history ? TestRouter : BrowserRouter;

  const Router = !componentProviderOverrides.Router
    ? BrowserRouter
    : componentProviderOverrides.Router;

  return (
    <Suspense fallback={<PageLoading />}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <HelmetProvider>
            <Router history={history}>
              <AppThemeProvider>{children}</AppThemeProvider>
            </Router>
          </HelmetProvider>
        </Provider>
      </StylesProvider>
    </Suspense>
  );
}

export default AppProvider;
