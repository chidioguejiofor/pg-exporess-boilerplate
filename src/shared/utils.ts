import { Response } from "express";
import { AppLogger } from "./logger";

import { DataValidationError } from "errors";
import { ObjectSchema } from "joi";
import { NotFound, Unauthorized } from "./errors";

export function validateData<T>(schema: ObjectSchema, data: T) {
  const { value, error } = schema.validate(data, {
    abortEarly: false,
    errors: { wrap: { label: false } },
  });

  if (error) {
    throw new DataValidationError(error);
  }

  return value as T;
}

export function handleErrors(res: Response, error: Error) {
  if (error instanceof DataValidationError) {
    return res.status(400).json({
      message: "Validation Error",
      errors: error.errors,
    });
  }

  if (error instanceof NotFound) {
    return res.status(404).json({
      message: error.message,
    });
  }

  if (error instanceof Unauthorized) {
    return res.status(401).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Unknown error",
  });
}

export const createLogger = (moduleName: string) => {
  const logger = new AppLogger(moduleName);
  return logger;
};

const DEFAULT_ERROR_MSG = "An error occured while processing requests";

type UnknownErrorArgument = {
  error: unknown;
  logger: AppLogger;
  loggerMsg?: string;
};

export const handleUnknownError = (
  res: Response,
  args: UnknownErrorArgument
) => {
  const { error, logger, loggerMsg: msg = DEFAULT_ERROR_MSG } = args;
  logger.error(`${msg} ${error}`, { error });
  res.status(500).json({
    message:
      "An error occured while processing your request. Please contact support",
  });
};
