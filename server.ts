import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthController from './api/controllers/auth/auth.controller';
import { globalErrorHandler } from './api/middlewares/api-error-handler';
import { InitializeFirebaseAdmin } from './firebase-config';
import UserController from './api/controllers/users/user.controller';
import morgan from 'morgan';
import TagsController from './api/controllers/tags/tags.controller';
import ParksController from './api/controllers/parks/parks.controller';
import TracksController from './api/controllers/tracks/tracks.controller';

export default async (app: Express) => {
  app.set('json spaces', 4);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  if (process.env.NODE_ENV == 'dev') {
    // const origins = ['http://127.0.0.1:5173', 'http://localhost:5173'];
    console.log('Server env:', process.env.NODE_ENV);
    app.use(
      cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
      })
    );

    app.use(morgan('dev'));
  }

  InitializeFirebaseAdmin();

  AuthController(app);
  UserController(app);
  TagsController(app);
  ParksController(app);
  TracksController(app);

  app.use(globalErrorHandler);
};
