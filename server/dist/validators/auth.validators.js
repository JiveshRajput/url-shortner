"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sameUserValidator = void 0;
const helpers_1 = require("../helpers");
const sameUserValidator = (request, userId, next) => {
    var _a;
    try {
        const { user } = request;
        if (!userId) {
            throw new Error(helpers_1.messages.userIdNotExistsMessage);
        }
        if (((_a = user._id) === null || _a === void 0 ? void 0 : _a.toString()) !== userId && !(user === null || user === void 0 ? void 0 : user.isValidated)) {
            throw new Error(helpers_1.messages.accessDeniedMessage);
        }
        return user;
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.accessDeniedMessage, 401));
    }
};
exports.sameUserValidator = sameUserValidator;
