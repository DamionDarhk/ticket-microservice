import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError } from '@zzelda/ticket-common';
import { InternalServerError } from '@zzelda/ticket-common';
import { validationRequest } from '@zzelda/ticket-common';

const router = express.Router();

router.post(
  '/api/users/registration',
  [
    body('email').isEmail().withMessage('Email must be validated'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 & 20 chars.'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;

    const existingUser = await User.findOne({ email });

    console.log('existingUser:', existingUser);

    if (existingUser) {
      throw new BadRequestError('Email already registered');
    }

    const user = User.build({ email, password });
    await user.save();

    if (!JWT_SECRET) {
      throw new InternalServerError();
    }

    //generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET!,
    );

    //Store JWT in cookie session
    req.session = {
      jwt: userJwt,
    };

    console.log('JWT Cookie Set');

    return res.status(201).send({ message: 'Email registered', user });
  },
);

export { router as registrationRoute };
