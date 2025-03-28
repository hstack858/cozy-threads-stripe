import { afterAll, beforeAll } from "@jest/globals";
import { ChildProcess, spawn } from "child_process";
import path from "path";
import supertest from "supertest";

let serverProcess: ChildProcess;

beforeAll((done) => {
  const serverPath = path.resolve(__dirname, "src/index.ts");
  serverProcess = spawn("npx", ["tsx", serverPath]);

  const checkServer = () => {
    supertest("http://localhost:8080")
      .get("/config")
      .then(() => {
        done();
      })
      .catch(() => {
        setTimeout(checkServer, 2000);
      });
  };

  checkServer();
});

afterAll(() => {
  serverProcess.kill();
});
