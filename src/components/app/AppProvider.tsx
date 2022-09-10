import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store as defaultStore } from "~/store";
import PageLoading from "~/ui/layout/PageLoading";

import { AppThemeProvider } from "./AppThemeProvider";

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
            <AppThemeProvider>
              {children}
              <Toaster position="bottom-right" />
            </AppThemeProvider>
          </Router>
        </HelmetProvider>
      </Provider>
    </Suspense>
  );
}

export default AppProvider;
