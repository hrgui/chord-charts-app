import { render, act, RenderResult } from "@testing-library/react";
import { AppProvider } from "~/components/app/AppProvider";
import { Router as TestRouter } from "react-router-dom";
import { createStore } from "~/store";

export interface RenderWithAppControllerProps {
  store?;
  [name: string]: any;
}

export function renderWithAppProvider(
  ui,
  {
    store = createStore(),
    gqlMocks = [],
    mockedProviderProps = {},
    ...appControllerProps
  }: RenderWithAppControllerProps = {}
): RenderResult {
  const TestComponentProviderOverrides = {
    Router: appControllerProps.history && TestRouter,
  };

  let el;
  act(() => {
    el = render(
      <AppProvider
        basename=""
        componentProviderOverrides={TestComponentProviderOverrides}
        store={store}
        apolloProviderProps={{ mocks: gqlMocks, ...mockedProviderProps }}
        {...appControllerProps}
      >
        {ui}
      </AppProvider>
    );
  });

  const { rerender: _rerender, ...otherElProps } = el;

  return {
    ...otherElProps,
    rerender: (ui) => {
      return _rerender(
        <AppProvider
          basename=""
          componentProviderOverrides={TestComponentProviderOverrides}
          store={store}
          apolloProviderProps={{ mocks: gqlMocks, ...mockedProviderProps }}
          {...appControllerProps}
        >
          {ui}
        </AppProvider>
      );
    },
  };
}
