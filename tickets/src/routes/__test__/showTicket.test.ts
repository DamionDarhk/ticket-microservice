import request from 'supertest';
import { app } from '../../server';
import mongoose from 'mongoose';

it('Should throw 404 if ticket is not found', async () => {
  const cookie = await global.signIn();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).set('Cookie', cookie).expect(404);
});

it('Should return ticket', async () => {
  const cookie = await global.signIn();
  const title = 'Assasign Creed Concert';
  const price = 23.3;

  const saveTicketResponse = await request(app)
    .post('/api/tickets/add_ticket')
    .set('Cookie', cookie)
    .send({
      title,
      price,
    })
    .expect(201);

  const getTicketResponse = await request(app)
    .get(`/api/tickets/${saveTicketResponse.body.id}`)
    .set('Cookie', cookie)
    .expect(200);

  expect(getTicketResponse.body.title).toEqual(title);
  expect(getTicketResponse.body.price).toEqual(price);
});
