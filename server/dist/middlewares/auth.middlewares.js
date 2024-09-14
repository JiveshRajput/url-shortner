"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
/**
 * This middleware is used to verify the jwt token.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const verifyTokenMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Finding token
        const tokenWithPrefix = request.headers.authorization;
        const token = tokenWithPrefix === null || tokenWithPrefix === void 0 ? void 0 : tokenWithPrefix.split(' ')[1];
        if (!token) {
            throw new Error(helpers_1.messages.tokenNotExistsMessage);
        }
        // Verifying token
        const isTokenVerified = (0, helpers_1.verifyJwt)(token);
        if (!isTokenVerified) {
            throw new Error(helpers_1.messages.tokenExpiredMessage);
        }
        // Verifying user
        const decodedToken = (0, helpers_1.decodeJwt)(token);
        if (!decodedToken) {
            throw new Error(helpers_1.messages.tokenNotVerifiedMessage);
        }
        // Getting payload from token and verifying it
        const { payload } = decodedToken;
        const { userId } = payload;
        const userData = yield models_1.UserModel.findById(userId);
        if (!userData) {
            throw new Error(helpers_1.messages.tokenNotVerifiedMessage);
        }
        // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
        request.user = userData;
        // Go to next
        next();
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.tokenNotVerifiedMessage, 401));
    }
});
exports.verifyTokenMiddleware = verifyTokenMiddleware;
