import React from "react";
import "lib/global.css";
import AppProvider from "./core/AppProvider";
import AppRootRoutes from "./AppRootRoutes";

function App({ children, config, basename }: { children?; config?; basename? }) {
  return (
    <AppProvider basename={basename} config={config}>
      {children ? children : <AppRootRoutes />}
    </AppProvider>
  );
}

export default App;
