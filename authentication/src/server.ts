import express from 'express';
import { json } from 'body-parser';
import { currentUserRoute } from './routes/currentUser';
import { loginRoute } from './routes/login';
import { logoutRoute } from './routes/logout';
import { registrationRoute } from './routes/registration';

const app = express();

app.use(json());

app.use(currentUserRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(registrationRoute);

app.listen(1000, () => {
  console.info('Listening on port number: 1000');
});
