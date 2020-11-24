import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../errors/forbiddenError';

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new ForbiddenError();
  }
  next();
};
