import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: [
    {
      command: "npm start",
      port: 3000,
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "tsx ../server/src/index.ts",
      port: 8080,
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
  ],
  use: {
    baseURL: "http://localhost:3000",
  },
});
