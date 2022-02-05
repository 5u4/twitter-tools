import { createLogger } from "@lvksh/logger";
import { FileLogger, FileLoggerConfig } from "@lvksh/logger/lib/file-log";
import chalk from "chalk";
import { join } from "path";

const fileConfig: FileLoggerConfig = {
  mode: "NEW_FILE",
  path: join(__dirname, "../logs"),
  namePattern: `${Date.now()}.log`,
};

const methodConfig = {
  info: { label: chalk.cyan`[INFO]`, newLine: "", newLineEnd: "\n" },
};

export const logger = createLogger(methodConfig, { padding: "PREPEND" }, [
  FileLogger(fileConfig),
  console.log,
]);
