import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/registration',
  [
    body('email').isEmail().withMessage('Email must be validated'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 & 20 chars'),
  ],
  (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(error.array());
    }
    const { email, password } = req.body;
    res.send({ message: 'Hello TypeScript registration' });
  },
);

export { router as registrationRoute };
