import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { StylesProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

import { store } from "app/store/store";
import { Provider } from "react-redux";
import { AppThemeProvider } from "./AppThemeProvider";
import { configureStore } from "app/store";
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
  store = configureStore(),
  initialState = null,
  config = null,
  history,
  componentProviderOverrides = {},
}: AppControllerProps) {
  if (config || initialState) {
    store = configureStore({
      initialState: initialState || {
        uiState: config,
      },
    });
  }
  // const Router: any = history ? TestRouter : BrowserRouter;

  const Router = !componentProviderOverrides.Router
    ? BrowserRouter
    : componentProviderOverrides.Router;

  return (
    <Suspense fallback={<PageLoading />}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <StoreProvider store={store}>
            <HelmetProvider>
              <Router history={history}>
                <AppThemeProvider>{children}</AppThemeProvider>
              </Router>
            </HelmetProvider>
          </StoreProvider>
        </Provider>
      </StylesProvider>
    </Suspense>
  );
}

export default AppProvider;
