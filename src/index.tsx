import "./polyfills";
import React from "react";
import App from "~/components/app/App";
import { createRoot } from "react-dom/client";
import "./i18n";
import "api/db";
import "./index.css";

export async function bootstrap() {
  const container = document.getElementById("root");
  const root = createRoot(container as HTMLElement);
  root.render(<App />);
}

bootstrap();
