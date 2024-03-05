import express from 'express';
import * as dotenv from 'dotenv';
import dbConnection from './database/connection';
import expressApp from './server';

dotenv.config();

const port = process.env.PORT;

const StartServer = async () => {
  const app = express();

  await dbConnection();

  await expressApp(app);

  app
    .listen(port, () => {
      console.log(`listening to port ${port}`);
    })
    .on('error', (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
