import { Request, Response, NextFunction } from 'express';
import { InternalServerError } from '../errors/internalServerError';
import { RequestValidationError } from '../errors/requestValidationError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('error: ', err);

  if (err instanceof InternalServerError) {
    console.log('errorHandler: InternalServerError');
  }

  if (err instanceof RequestValidationError) {
    console.log('errorHandler: RequestValidationError');
  }

  return res.status(400).send({ message: 'Internal Server Error-12-12' });
};
