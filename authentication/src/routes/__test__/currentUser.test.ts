import request from 'supertest';
import { app } from '../../server';

it('return http code 200 on getCurrentUser API', async () => {
  // const registrationResponse = await request(app)
  //   .post('/api/users/registration')
  //   .send({
  //     email: 'bruce.wayne@dc.com',
  //     password: 'dark@123',
  //   })
  //   .expect(201);

  // const cookie = registrationResponse.get('Set-Cookie');

  const cookie = await global.signIn();

  const response = await request(app)
    .get('/api/users/current_user')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  //console.log('response getCurrentUser', response);
  expect(response.body.currentUserOutput.email).toEqual('bruce.wayne@dc.com');
});
