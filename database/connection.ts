import mongoose from 'mongoose';

export default async function dbConnection() {
  try {
    mongoose.connect(process.env.DEV_DB as string).then(() => {
      console.log('connected to db!');
    });
  } catch (error) {
    console.log(error);
  }
}
