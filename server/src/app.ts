import { initialAppSetup } from './configs';
import setupRoutes from './routes';

// App Initialization
const { app, startApp, globalErrorHandlingMiddleware } = initialAppSetup();

// Routes Initialization
setupRoutes(app, '/app/v1');

// Global Middleware
globalErrorHandlingMiddleware();

// Starting the app
startApp();
