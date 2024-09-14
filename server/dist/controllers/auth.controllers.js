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
exports.verifyOtpController = exports.sendOtpByEmailController = exports.sendOtpController = exports.authenticateUserController = exports.resetPasswordByOtpController = exports.resetPasswordController = exports.getAccessTokenController = exports.logoutUserController = exports.loginUserController = exports.getUserController = exports.updateUserController = exports.registerUserController = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const validators_1 = require("../validators");
/**
 * This controller is used to register the user and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const registerUserController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructuring data
        const { password, email } = request.body;
        // validating required fields
        if (!(email && password)) {
            throw new Error(helpers_1.messages.missingCredentialsMessage);
        }
        // checking if user already registered
        const userExists = yield models_1.UserModel.findOne({ email });
        if (userExists) {
            throw new Error(helpers_1.messages.userExistsMessage);
        }
        // registering a user
        const userData = yield models_1.UserModel.create(Object.assign(Object.assign({}, request.body), { password: yield (0, helpers_1.hashKey)(password) }));
        // Creating JWT Tokens
        const { accessToken, refreshToken } = yield (0, helpers_1.generateTokens)(userData);
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.registerSuccessMessage, {
            data: userData,
            accessToken,
            refreshToken,
        }, 201);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.registerFailedMessage));
    }
});
exports.registerUserController = registerUserController;
/**
 * This controller is used to update the user's details and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const updateUserController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructuring data
        const { userId } = request.params;
        // checking if jwt userId and current userId is same or not
        const middlewareUser = (0, validators_1.sameUserValidator)(request, userId, next);
        const body = request.body;
        const { number, password } = body;
        // checking if user already registered
        const user = yield models_1.UserModel.findById(userId);
        if (!user) {
            throw new Error(helpers_1.messages.userNotExistsMessage);
        }
        // checking if password is present in payload
        if (password) {
            throw new Error(helpers_1.messages.cannotUpdatePasswordMessage);
        }
        // checking number already exists or not
        if (!(number !== user.number)) {
            const numberExists = yield models_1.UserModel.findOne({ number });
            if (numberExists) {
                throw new Error(helpers_1.messages.numberExistsMessage);
            }
        }
        // updating user details
        const updatedUserData = yield models_1.UserModel.findOneAndUpdate({ _id: userId }, body, {
            new: true,
        });
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.userDetailsUpdateSuccessMessage, {
            data: updatedUserData,
        });
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.userDetailsUpdateFailedMessage));
    }
});
exports.updateUserController = updateUserController;
/**
 * This controller is used to get user's details.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const getUserController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructuring data
        const { userId } = request.params;
        // checking if jwt userId and current userId is same or not
        const middlewareUser = (0, validators_1.sameUserValidator)(request, userId, next);
        // checking if user already registered
        const user = yield models_1.UserModel.findById(userId);
        if (!user) {
            throw new Error(helpers_1.messages.userNotExistsMessage);
        }
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.getUserDetailsSuccessMessage, {
            data: user,
        });
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.getUserDetailsFailedMessage));
    }
});
exports.getUserController = getUserController;
/**
 * This controller is used to login the user.
 * It returns a token in response.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const loginUserController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        // Checking are values present
        if (!(email && password)) {
            throw new Error(helpers_1.messages.missingCredentialsMessage);
        }
        // Checking user
        const userData = yield models_1.UserModel.findOne({ email });
        if (!userData) {
            throw new Error(helpers_1.messages.userNotRegisteredMessage);
        }
        // Checking password
        const isPasswordCorrect = yield (0, helpers_1.compareHashKey)(password, userData.password);
        if (!isPasswordCorrect) {
            throw new Error(helpers_1.messages.wrongCredentialsMessage);
        }
        // Creating JWT Tokens
        const { accessToken, refreshToken } = yield (0, helpers_1.generateTokens)(userData);
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.loginSuccessfulMessage, {
            data: userData,
            accessToken,
            refreshToken,
        });
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.loginFailedMessage));
    }
});
exports.loginUserController = loginUserController;
/**
 * This controller is used to logout the user.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<IResponse | undefined>}: Returns a promise
 */
const logoutUserController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = request.body;
        // Checking are values present
        if (!refreshToken) {
            throw new Error(helpers_1.messages.missingRefreshToknMessage);
        }
        // Finding refresh token
        const userRefreshToken = yield models_1.RefreshTokenModel.findOne({ token: refreshToken });
        // Creating success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.logoutSuccessfulMessage);
        // Checking if refresh token exists
        if (!userRefreshToken) {
            // Sending success response
            return response.status(responseMessage.statusCode).json(responseMessage);
        }
        // Deleting refresh token
        yield userRefreshToken.deleteOne();
        // Sending success response
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.logoutFailedMessage));
    }
});
exports.logoutUserController = logoutUserController;
/**
 * This controller is used to get access token from refresh token.
 * It returns a token in response.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const getAccessTokenController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = request.body;
        // Checking are values present
        if (!refreshToken) {
            throw new Error(helpers_1.messages.missingRefreshToknMessage);
        }
        // Verify refresh token
        const result = yield (0, helpers_1.verifyRefreshToken)(refreshToken);
        if (!result) {
            throw new Error(helpers_1.messages.tokenNotVerifiedMessage);
        }
        const { userId, email } = result;
        const payload = { _id: userId, email };
        // Creating access token
        const accessToken = (0, helpers_1.createAccessTokenJwt)((0, helpers_1.getJwtPayload)(payload));
        // Creating success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.accessTokenCreatedSuccessMessage, {
            data: { accessToken },
        });
        // Sending success response
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.accessTokenCreatedFailedMessage, 401));
    }
});
exports.getAccessTokenController = getAccessTokenController;
/**
 * This controller is used to reset the password of user.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const resetPasswordController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.params;
        const { password, oldPassword } = request.body;
        // checking if jwt userId and current userId is same or not
        const user = (0, validators_1.sameUserValidator)(request, userId, next);
        if (!user) {
            throw new Error(helpers_1.messages.accessDeniedMessage);
        }
        // Checking old password is same or not
        const isOldPasswordCorrect = yield (0, helpers_1.compareHashKey)(oldPassword, user === null || user === void 0 ? void 0 : user.password);
        if (!isOldPasswordCorrect) {
            throw new Error(helpers_1.messages.oldPasswordWrongMessage);
        }
        // Checking are values present
        if (!(userId && password)) {
            throw new Error(helpers_1.messages.missingCredentialsMessage);
        }
        // Checking user
        const userData = yield models_1.UserModel.findById(userId);
        if (!userData) {
            throw new Error(helpers_1.messages.userNotRegisteredMessage);
        }
        // Hashing the password and saving it
        userData.password = yield (0, helpers_1.hashKey)(password);
        yield userData.save();
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.passwordResetSuccessMessage);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.passwordResetFailedMessage));
    }
});
exports.resetPasswordController = resetPasswordController;
/**
 * This controller is used to reset the password of user via OTP.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const resetPasswordByOtpController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, otp, email } = request.body;
        // Checking are values present
        if (!(otp && password && email)) {
            throw new Error(helpers_1.messages.missingCredentialsMessage);
        }
        // Checking user
        const userData = yield models_1.UserModel.findOne({ email });
        if (!userData) {
            throw new Error(helpers_1.messages.userNotExistsMessage);
        }
        // Find the most recent OTP for the email
        const otpResponse = yield models_1.OtpModel.find({ email }).sort({ createdAt: -1 }).limit(1);
        // matching the OTP value
        if (otpResponse.length === 0 || otp !== otpResponse[0].otp) {
            throw new Error(helpers_1.messages.otpValidFailureMessage);
        }
        // Deleting OTP
        otpResponse[0].deleteOne();
        // Hashing the password and saving it
        userData.password = yield (0, helpers_1.hashKey)(password);
        yield userData.save();
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.passwordResetSuccessMessage);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.passwordResetFailedMessage));
    }
});
exports.resetPasswordByOtpController = resetPasswordByOtpController;
/**
 * This controller is used to authenticate the user.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const authenticateUserController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.body;
        // checking if jwt userId and current userId is same or not
        const user = (0, validators_1.sameUserValidator)(request, userId, next);
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.tokenAuthenticatedSuccessMessage);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.tokenAuthenticatedFailedMessage, 401));
    }
});
exports.authenticateUserController = authenticateUserController;
/**
 * This controller is used to send OTP on registered user's mail.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const sendOtpController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
        const { user } = request;
        // finding unqiue OTP.
        let otp = (0, helpers_1.generateOtp)();
        let isOtpExists = yield models_1.OtpModel.findOne({ otp });
        while (isOtpExists) {
            otp = (0, helpers_1.generateOtp)();
            isOtpExists = yield models_1.OtpModel.findOne({ otp });
        }
        yield models_1.OtpModel.create({
            email: user.email,
            otp,
        });
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.otpSentSuccessMessage);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.otpSentFailureMessage));
    }
});
exports.sendOtpController = sendOtpController;
/**
 * This controller is used to send OTP on registered user's mail.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const sendOtpByEmailController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.body;
        const user = yield models_1.UserModel.findOne({ email });
        if (!user) {
            throw new Error(helpers_1.messages.emailNotRegisteredMessage);
        }
        // finding unqiue OTP.
        let otp = (0, helpers_1.generateOtp)();
        let isOtpExists = yield models_1.OtpModel.findOne({ otp });
        while (isOtpExists) {
            otp = (0, helpers_1.generateOtp)();
            isOtpExists = yield models_1.OtpModel.findOne({ otp });
        }
        yield models_1.OtpModel.create({ email, otp });
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.otpSentSuccessMessage);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.otpSentFailureMessage));
    }
});
exports.sendOtpByEmailController = sendOtpByEmailController;
/**
 * This controller is used to verify the email for registered user.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const verifyOtpController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructuring data otp, email
        const { otp, userId } = request.body;
        // checking if jwt userId and current userId is same or not
        const user = (0, validators_1.sameUserValidator)(request, userId, next);
        // Check if user already verified or not
        if (user === null || user === void 0 ? void 0 : user.isValidated) {
            throw new Error(helpers_1.messages.alreadyVerifiedMessage);
        }
        // Find the most recent OTP for the email
        const otpResponse = yield models_1.OtpModel.find({ email: user === null || user === void 0 ? void 0 : user.email })
            .sort({ createdAt: -1 })
            .limit(1);
        // matching the OTP value
        if (otpResponse.length === 0 || otp !== otpResponse[0].otp) {
            throw new Error(helpers_1.messages.otpValidFailureMessage);
        }
        // if otp matched, updating user's detail and saving isValidated to true
        const userResponse = yield models_1.UserModel.findById(userId);
        if (!userResponse) {
            throw new Error(helpers_1.messages.userNotExistsMessage);
        }
        userResponse.isValidated = true;
        yield userResponse.save();
        // Deleting OTP
        yield otpResponse[0].deleteOne();
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.otpValidSuccessMessage, { data: userResponse });
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.otpValidFailureMessage));
    }
});
exports.verifyOtpController = verifyOtpController;
