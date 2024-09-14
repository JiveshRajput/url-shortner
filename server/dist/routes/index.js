"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_route_1 = __importDefault(require("./url.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const home_route_1 = __importDefault(require("./home.route"));
const setupRoutes = (app, urlPrefix = '') => {
    app.use(`${urlPrefix}/`, home_route_1.default);
    app.use(`${urlPrefix}/url`, url_route_1.default);
    app.use(`${urlPrefix}/auth`, auth_route_1.default);
};
exports.default = setupRoutes;
