import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../server';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signIn(): string[];
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

global.signIn = () => {
  //create payload
  const payload = {
    id: 'qsqw',
    email: 'bruce.wayne@dc.com',
  };

  //create jwt token
  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  //create session object
  const session = { jwt: token };

  //turn session to JSON
  const sessionJson = JSON.stringify(session);

  //turn sessionOject to base64
  const base64Session = Buffer.from(sessionJson).toString('base64');

  //return the string that's the session w/ encoded data
  return [`express:sess=${base64Session}`];
};
