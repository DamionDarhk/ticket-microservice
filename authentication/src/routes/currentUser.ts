import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/currentUser';
import { authentication } from '../middlewares/authentication';

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.get(
  '/api/users/current_user',
  currentUser,
  authentication,
  (req: Request, res: Response) => {
    // if (!req.session?.jwt) {
    //   return res.send({ currentUser: null });
    // }

    // try {
    //   const payload = jwt.verify(req.session.jwt, JWT_SECRET!);
    //   return res.send(payload);
    // } catch (error) {
    //   return res.send({ currentUser12: null });
    // }
    return res.send({ currentUserOutput: req.currentUser || null });
  },
);

export { router as currentUserRoute };
