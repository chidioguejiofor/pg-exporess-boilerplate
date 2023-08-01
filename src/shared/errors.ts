export class CustomError extends Error {}

export class NotFound extends CustomError {
  message = "Resource not found";
}

export class Unauthorized extends CustomError {
  message = "Not authorized";
}