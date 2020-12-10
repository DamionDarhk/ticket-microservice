import request from 'supertest';
import { app } from '../../server';

it('Should throw error if input value are wrong in add ticket route API', async () => {
  const cookie = await global.signIn();

  await request(app).post('/api/tickets/add_ticket').set('Cookie', cookie).send().expect(400);
});

it('return unauthorized error when utilizing addTicket API when user not signed in', async () => {
  await request(app).post('/api/tickets/add_ticket').send({}).expect(401);
});

it('Create a ticket with valid input', async () => {
  const cookie = await global.signIn();

  await request(app)
    .post('/api/tickets/add_ticket')
    .set('Cookie', cookie)
    .send({
      title: 'Testing Title',
      price: 12.4,
    })
    .expect(201);
});
