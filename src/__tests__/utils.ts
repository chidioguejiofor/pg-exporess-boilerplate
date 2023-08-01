import { exec } from "child_process";
import { createLogger } from "shared/utils";

type TestCaseArg = string | number | object | undefined;

const logger = createLogger("Utils");

export function parameterized(
  message: string,
  testCases: TestCaseArg[][] | TestCaseArg[],
  target: CallableFunction
) {
  for (const [index, testCase] of testCases.entries()) {
    if (Array.isArray(testCase)) {
      it(`${message} ${index} `, async () => {
        await target(...testCase);
      });
    } else {
      it(`${message} ${index}: ${testCase} `, async () => {
        await target(testCase);
      });
    }
  }
}

export const runShellCommand = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      logger.error(err);
      console.log(err);
      if (err) throw reject(stderr);
      resolve(stdout);
    });
  });
};
