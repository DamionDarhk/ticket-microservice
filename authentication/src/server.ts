import express from 'express';
require('express-async-errors');
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRoute } from './routes/currentUser';
import { loginRoute } from './routes/login';
import { logoutRoute } from './routes/logout';
import { registrationRoute } from './routes/registration';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';
import morgan from 'morgan';

import mongoose from 'mongoose';

const app = express();

//add to trust https request being proxied over ingress-nginx
app.set('trust proxy', true);

morgan.token('localDate', function getDate() {
  const date = new Date();
  return date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
});

app.use(
  morgan(
    ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :req[body] :res[content-length] ":referrer" ":user-agent"',
  ),
);

app.use(json());

/**
 * @signed false: disable encryption in cookie body, as JWT is used inside an cookie
 * and it's already encrypted
 * @secure true: use cookie only when https connection is used
 */
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
);

app.use(currentUserRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(registrationRoute);

app.all('*', () => {
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
