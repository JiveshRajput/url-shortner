"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateError = exports.CreateResponse = void 0;
const types_1 = require("../types");
const messages_1 = require("./messages");
// Success response object pattern
class CreateResponse {
    static success(message = messages_1.messages.successMessage, data = {}, statusCode = 200) {
        return Object.assign({ message, statusCode, status: types_1.IStatusType.OK }, data);
    }
}
exports.CreateResponse = CreateResponse;
// Error response object pattern
class CreateError {
    static clientError(message = messages_1.messages.clientSideErrorMessage, statusCode = 400) {
        return { message, statusCode, status: types_1.IStatusType.FAIL };
    }
    static serverError(message = messages_1.messages.serverSideErrorMessage, statusCode = 500) {
        return { message, statusCode, status: types_1.IStatusType.FAIL };
    }
}
exports.CreateError = CreateError;
