import "./polyfills";
import "./setupDevEnv";
import React from "react";
import ReactDOM from "react-dom";
import App from "app/App";
import "./i18n";

export async function bootstrap() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

bootstrap();
