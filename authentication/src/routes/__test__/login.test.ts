import request from 'supertest';
import { app } from '../../server';

it('return http code 400 when invalid password is passed', async () => {
  await request(app)
    .post('/api/users/registration')
    .send({
      email: 'bruce.wayne@dc.com',
      password: 'dark@123',
    })
    .expect(201);

  await request(app)
    .post('/api/users/login')
    .send({
      email: 'bruce.wayne@dc.com',
      password: 'dark@12345',
    })
    .expect(400);
});

it('sets an cookie after successfull login', async () => {
  await request(app)
    .post('/api/users/registration')
    .send({
      email: 'bruce.wayne@dc.com',
      password: 'dark@123',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/login')
    .send({
      email: 'bruce.wayne@dc.com',
      password: 'dark@123',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
