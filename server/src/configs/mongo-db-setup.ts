import { connect } from 'mongoose';

export const mongoDbSetup = () => {
  const getMongoDBUrl = (url: string, username: string, password: string) => {
    return url?.replace('{username}', username)?.replace('{password}', password);
  };

  const connectToDB = async () => {
    const mongoDbUri = getMongoDBUrl(
      process.env.MONGODB_URI as string,
      process.env.MONGODB_USERNAME as string,
      process.env.MONGODB_PASSWORD as string,
    );

    await connect(mongoDbUri);
    console.log('MongoDB status: CONNECTED');
  };

  return { connectToDB };
};
