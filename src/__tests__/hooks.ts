import { runShellCommand } from "./utils";
import "infrastructure/app";

export const mochaHooks = {
  async beforeAll() {
    // do something before every test

    // sandbox = sinon.createSandbox();
    console.log("Running BEFORE hook...");
    const stdout = await runShellCommand("npx sequelize db:migrate");
    console.log(`stdout: ${stdout}`);
  },

  async afterAll() {
    console.log("Running AFTER hook...");
    const stdout = await runShellCommand("npx sequelize db:migrate:undo:all");
    console.log(`stdout: ${stdout}`);
  },
};
