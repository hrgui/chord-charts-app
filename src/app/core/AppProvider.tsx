import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { StylesProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";

import { store as defaultStore } from "app/store";
import { Provider } from "react-redux";
import { AppThemeProvider } from "./AppThemeProvider";
import { Theme, Button } from "react-daisyui";
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
  store = defaultStore,
  componentProviderOverrides = {},
}: AppControllerProps) {
  // const Router: any = history ? TestRouter : BrowserRouter;

  const Router = !componentProviderOverrides.Router
    ? BrowserRouter
    : componentProviderOverrides.Router;

  return (
    <Suspense fallback={<PageLoading />}>
      <Theme dataTheme="dark">
        <StylesProvider injectFirst>
          <Provider store={store}>
            <HelmetProvider>
              <Router history={history}>
                <AppThemeProvider>{children}</AppThemeProvider>
              </Router>
            </HelmetProvider>
          </Provider>
        </StylesProvider>
      </Theme>
    </Suspense>
  );
}

export default AppProvider;
