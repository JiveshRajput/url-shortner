import mongoose from 'mongoose';
import { getMongoDBUrl } from '../helpers';

const mongoDbSetup = () => {
  const connectToDB = async () => {
    const mongoDbUri = getMongoDBUrl(
      process.env.MONGODB_URI as string,
      process.env.MONGODB_USERNAME as string,
      process.env.MONGODB_PASSWORD as string,
    );

    await mongoose.connect(mongoDbUri);
    console.log('MongoDB status: CONNECTED');
  };

  return { connectToDB };
};

export default mongoDbSetup;
