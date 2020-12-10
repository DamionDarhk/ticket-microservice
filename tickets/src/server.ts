import express from 'express';
require('express-async-errors');
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@zzelda/ticket-common';
import { addTicketRouter } from './routes/addTicket';
import { showTicketRouter } from './routes/showTicket';
import { updateTicketRouter } from './routes/updateTicket';
import morgan from 'morgan';

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
    secure: process.env.NODE_ENV !== 'test',
  }),
);

app.use(currentUser);

app.use(addTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
