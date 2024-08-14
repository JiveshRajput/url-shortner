import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import { mongoDbSetup } from './mongo-db-setup';
import {
  IError,
  IExpress,
  INextFunction,
  IRequest,
  IResponse,
  PortType,
  VoidFunction,
} from '../types';
import { PORT as BACKUP_PORT } from '.';

export const initialAppSetup = () => {
  const app: IExpress = express();

  // Middleware for handling environment
  dotenv.config();

  // Middleware for handling cors error
  app.use(cors());

  // Middleware for handling JSON, URL-encoded data, and serving static files
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static('public'));

  // Middleware for handling logging
  app.use(morgan('tiny'));
  app.use(
    morgan(':method | :date[clf] | :response-time | :status | :url', {
      stream: fs.createWriteStream(path.join(__dirname, '../../access.log')),
    }),
  );

  // Global error handling middleware
  const globalErrorHandlingMiddleware: VoidFunction = () => {
    app.use((error: IError, request: IRequest, response: IResponse, next: INextFunction) => {
      response.status(error.statusCode || 500).json(error);
    });
  };

  // Port number of app
  const PORT: PortType = process.env.PORT || BACKUP_PORT;

  // callback of success listener of app
  const listenerSuccessCallback: VoidFunction = () => {
    console.log(`App status: STARTED`);
    console.log(`App PORT: ${PORT}`);
    mongoDbSetup().connectToDB();
  };

  // start the app
  const startApp: VoidFunction = () => {
    app.listen(PORT, listenerSuccessCallback);
  };

  return { app, startApp, globalErrorHandlingMiddleware };
};
