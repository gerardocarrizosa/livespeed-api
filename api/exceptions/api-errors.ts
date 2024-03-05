export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;
  public readonly description: string;

  constructor(
    name: string,
    httpCode: number,
    description: string,
    isOperational: boolean
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.description = description;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class ApiError extends BaseError {
  constructor(message: string) {
    super(
      'Internal Server Error',
      HTTP_STATUS_CODES.INTERNAL_ERROR,
      message,
      true
    );
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string = 'Bad Request') {
    super('Bad Request', HTTP_STATUS_CODES.BAD_REQUEST, message, true);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = 'Not Found') {
    super('Not Found', HTTP_STATUS_CODES.NOT_FOUND, message, true);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string = 'Validation Error') {
    super('Validation Error', HTTP_STATUS_CODES.BAD_REQUEST, message, true);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string = 'Validation Error') {
    super('Unauthorized', HTTP_STATUS_CODES.UNAUTHORIZED, message, true);
  }
}
