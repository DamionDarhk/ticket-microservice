import request from 'supertest';
import { app } from '../../server';

it('return http code 200 on successfull registration', () => {
  return request(app)
    .post('/api/users/registration')
    .send({
      email: 'bruce.wayne@dc.com',
      password: 'dark@123',
    })
    .expect(201);
});

it('return http code 400 on invalid email', () => {
  return request(app)
    .post('/api/users/registration')
    .send({
      email: 'bruce.waynedc.com',
      password: 'dark@123',
    })
    .expect(400);
});

it('return http code 400 if same email is used to register', async () => {
  await request(app)
    .post('/api/users/registration')
    .send({
      email: 'bruce.wayne@dc.com',
      password: 'dark@123',
    })
    .expect(201);

  await request(app)
    .post('/api/users/registration')
    .send({
      email: 'bruce.wayne@dc.com',
      password: 'dark@123',
    })
    .expect(400);
});

it('Sets an cookie after successfull registration', async () => {
  const response = await request(app)
    .post('/api/users/registration')
    .send({
      email: 'bruce.wayne@dc.com',
      password: 'dark@123',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
