import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { RequestValidationError } from '../errors/requestValidationError';
import { User } from '../models/user';
import { BadRequestError } from '../errors/badRequestError';

const JWT_SECRET = '12sdasdasd2324dsdfdfgdvdfg#!@!@#sdsdsd';

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
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw new RequestValidationError(error.array());
    }

    const existingUser = await User.findOne({ email });

    console.log('existingUser:', existingUser);

    if (existingUser) {
      throw new BadRequestError('Email already registered');
    }

    const user = User.build({ email, password });
    await user.save();

    //generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
    );

    //Store JWT in cookie session
    req.session = {
      jwt: userJwt,
    };

    console.log('JWT Cookie Set');

    return res.send({ message: 'Email registered', user });
  },
);

export { router as registrationRoute };
