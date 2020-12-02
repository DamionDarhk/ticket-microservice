import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validationRequest } from '@zzelda/ticket-common';
import { User } from '../models/user';
import { BadRequestError } from '@zzelda/ticket-common';
import { Password } from '../utils/password';
import { InternalServerError } from '@zzelda/ticket-common';

const router = express.Router();

router.post(
  '/api/users/login',
  [
    body('email').isEmail().withMessage('Email must be validated'),
    body('password').trim().notEmpty().withMessage('Password is mandatory'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const isPasswordMatch = await Password.compare(existingUser.password, password);
    if (!isPasswordMatch) {
      throw new BadRequestError('Invalid Credentials-2');
    }

    if (!JWT_SECRET) {
      throw new InternalServerError();
    }

    //generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      JWT_SECRET,
    );

    //Store JWT in cookie session
    req.session = {
      jwt: userJwt,
    };

    res.send(existingUser);
  },
);

export { router as loginRoute };
