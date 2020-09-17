import { Request, Response, NextFunction } from 'express';
// import { InternalServerError } from '../errors/internalServerError';
// import { RequestValidationError } from '../errors/requestValidationError';
import { CustomError } from '../errors/customError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // if (err instanceof InternalServerError) {
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }

  // if (err instanceof RequestValidationError) {
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return res.status(400).send({ message: 'Internal Server Error-12-12' });
};
