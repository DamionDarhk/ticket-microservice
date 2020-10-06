import express from 'express';
require('express-async-errors');
import { json } from 'body-parser';
import { currentUserRoute } from './routes/currentUser';
import { loginRoute } from './routes/login';
import { logoutRoute } from './routes/logout';
import { registrationRoute } from './routes/registration';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

import mongoose from 'mongoose';

const app = express();

app.use(json());

app.use(currentUserRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(registrationRoute);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const startApplication = async () => {
  try {
    await mongoose.connect('mongodb://authentication-mongodb-srv:27017/authentication', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    mongoose.set('debug', true);
  } catch (error) {
    console.error('MongoDB Connection Error: ', error);
  }

  app.listen(1000, () => {
    console.info('Listening on port number: 1000');
  });
};

startApplication();
