import React from "react";
import "lib/global.css";
import AppProvider from "./core/AppProvider";
import AppRootRoutes from "./AppRootRoutes";

function App({ children, config }: { children?; config? }) {
  return <AppProvider config={config}>{children ? children : <AppRootRoutes />}</AppProvider>;
}

export default App;
