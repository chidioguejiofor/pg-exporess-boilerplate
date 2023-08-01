import { ValidationError } from "joi";
import { CustomError, NotFound, Unauthorized } from "shared/errors";

export class DataValidationError extends CustomError {
  public readonly errors: object;
  constructor(error: ValidationError) {
    super("");
    const errorObject: Record<string, string[]> = {};
    for (const detail of error.details) {
      const key = detail.context?.key as string;
      const message = detail.message;
      const keyErrors: string[] = errorObject[key] || [];
      keyErrors.push(message);
      errorObject[key] = keyErrors;
    }

    this.errors = errorObject;
  }
}

export class InvalidToken extends Unauthorized {
  message = "The token you provided is invalid";
}

export class InvalidAuthorizationHeaders extends Unauthorized {
  message = "The headers you inputed are malformed invalid";
}

export class UserNotFound extends NotFound {
  message = "The user does not exists";
}
