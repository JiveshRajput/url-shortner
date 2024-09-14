"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialAppSetup = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongo_db_setup_1 = require("./mongo-db-setup");
const _1 = require(".");
const initialAppSetup = () => {
    const app = (0, express_1.default)();
    // Middleware for handling environment
    dotenv_1.default.config();
    // Middleware for handling cors error
    app.use((0, cors_1.default)());
    // Middleware for handling JSON, URL-encoded data, and serving static files
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.static('public'));
    // Middleware for handling logging
    app.use((0, morgan_1.default)('tiny'));
    app.use((0, morgan_1.default)(':method | :date[clf] | :response-time | :status | :url', {
        stream: fs_1.default.createWriteStream(path_1.default.join(__dirname, '../../access.log')),
    }));
    // Global error handling middleware
    const globalErrorHandlingMiddleware = () => {
        app.use((error, request, response, next) => {
            response.status(error.statusCode || 500).json(error);
        });
    };
    // Port number of app
    const PORT = process.env.PORT || _1.PORT;
    // callback of success listener of app
    const listenerSuccessCallback = () => {
        console.log(`App status: STARTED`);
        console.log(`App PORT: ${PORT}`);
        (0, mongo_db_setup_1.mongoDbSetup)().connectToDB();
    };
    // start the app
    const startApp = () => {
        app.listen(PORT, listenerSuccessCallback);
    };
    return { app, startApp, globalErrorHandlingMiddleware };
};
exports.initialAppSetup = initialAppSetup;
