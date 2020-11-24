import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    console.log('session empty-1');
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, JWT_SECRET!) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
};
