import {
  ApiError,
  BadRequestError,
  BaseError,
  HTTP_STATUS_CODES,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../exceptions/api-errors';
import { NextFunction, Response, Request } from 'express';

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorDetails;

  switch (true) {
    case err instanceof BadRequestError:
      errorDetails = err as BadRequestError;
      return res.status(errorDetails.httpCode).json(errorDetails);
    case err instanceof NotFoundError:
      errorDetails = err as NotFoundError;
      return res.status(errorDetails.httpCode).json(errorDetails);
    case err instanceof UnauthorizedError:
      errorDetails = err as UnauthorizedError;
      return res.status(errorDetails.httpCode).json(errorDetails);
    case err instanceof ValidationError:
      errorDetails = err as ValidationError;
      return res.status(errorDetails.httpCode).json(errorDetails);
    case err instanceof ApiError:
      errorDetails = err as ApiError;
      return res.status(errorDetails.httpCode).json(errorDetails);

    default:
      res.status(HTTP_STATUS_CODES.INTERNAL_ERROR).send(err);
      break;
  }
}
