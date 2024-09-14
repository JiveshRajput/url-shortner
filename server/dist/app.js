"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("./configs");
const routes_1 = __importDefault(require("./routes"));
// App Initialization
const { app, startApp, globalErrorHandlingMiddleware } = (0, configs_1.initialAppSetup)();
// Routes Initialization
(0, routes_1.default)(app, '/app/v1');
// Global Middleware
globalErrorHandlingMiddleware();
// Starting the app
startApp();
