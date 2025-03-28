import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "node",
  testTimeout: 30000,
};

export default config;
