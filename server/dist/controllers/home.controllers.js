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
exports.submitEnquiryController = exports.appInfoController = void 0;
const configs_1 = require("../configs");
const helpers_1 = require("../helpers");
/**
 * This controller is used to register the user and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const appInfoController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const information = {
            name: configs_1.PROJECT_NAME,
            about: 'URL Shortener is a web app used to save your URLs in shorter form',
        };
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.successMessage, {
            data: information,
        });
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.failedMessage));
    }
});
exports.appInfoController = appInfoController;
/**
 * This controller is used to register the user and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const submitEnquiryController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message, number } = request.body;
        yield (0, helpers_1.sendGmail)((0, helpers_1.getGmailTemplate)(configs_1.ADMIN_EMAIL, `${configs_1.PROJECT_NAME} | Form Enquiry by ${name}`, (0, helpers_1.enquiryMailTemplate)(name, email, number, message)));
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.enquiryFormSubmittedSuccessMessage);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.enquiryFormSubmittedErrorMessage));
    }
});
exports.submitEnquiryController = submitEnquiryController;
