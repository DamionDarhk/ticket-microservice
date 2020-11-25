import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../server';
import request from 'supertest';

declare global {
  namespace NodeJS {
    interface Global {
      signIn(): Promise<string[]>;
    }
  }
}

let mongo: any;

//Create in-memory mongodb
beforeAll(async () => {
  process.env.JWT_SECRET = 'asasdqw12123!@!@!@sdsdhjsdkh32323';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

//before each individual test, delete all collections inside it
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

//after all test are finished, close all connections
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signIn = async () => {
  const registrationResponse = await request(app)
    .post('/api/users/registration')
    .send({
      email: 'bruce.wayne@dc.com',
      password: 'dark@123',
    })
    .expect(201);

  const cookie = registrationResponse.get('Set-Cookie');

  return cookie;
};
