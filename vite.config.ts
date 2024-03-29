/// <reference types="vitest" />

import reactPlugin from "@vitejs/plugin-react";
import viteTsConfigPathsPlugin from "vite-tsconfig-paths";
import { defineConfig, loadEnv } from "vite";

/**
 * @type {import('vite').UserConfig}
 */
const config = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce((prev, [key, val]) => {
    return {
      ...prev,
      ["process.env." + key]: `"${val}"`,
    };
  }, {});
  console.log(`mode=${mode} command=${command}`);

  return {
    plugins: [reactPlugin(), viteTsConfigPathsPlugin()],
    define: {
      ...envWithProcessPrefix,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || mode),
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/setupTests.ts",
      coverage: {
        reporter: ["text", "text-summary", "html"],
      },
    },
  };
});

export default config;
