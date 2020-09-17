import express from 'express';
require('express-async-errors');
import { json } from 'body-parser';
import { currentUserRoute } from './routes/currentUser';
import { loginRoute } from './routes/login';
import { logoutRoute } from './routes/logout';
import { registrationRoute } from './routes/registration';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

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

app.listen(1000, () => {
  console.info('Listening on port number: 1000');
});
