import "./polyfills";
import "./setupDevEnv";
import React from "react";
import App from "app/App";
import { createRoot } from "react-dom/client";
import "./i18n";

export async function bootstrap() {
  const container = document.getElementById("root");
  const root = createRoot(container as HTMLElement);
  root.render(<App />);
}

bootstrap();
