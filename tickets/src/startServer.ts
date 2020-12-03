import mongoose from 'mongoose';
import { app } from './server';

const startApplication = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Env. var. JWT_SECRET missing');
  }

  try {
    await mongoose.connect('mongodb://tickets-mongodb-srv:27017/tickets', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    mongoose.set('debug', true);
    console.info('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB Connection Error: ', error);
  }

  app.listen(1000, () => {
    console.info('Listening on port number: 1000');
  });
};

startApplication();
