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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserProfileImageController = void 0;
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../helpers");
const validators_1 = require("../validators");
/**
 * This controller is used to update the user's profile pic and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
const uploadUserProfileImageController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructuring data
        const { userId } = request.params;
        // checking if jwt userId and current userId is same or not
        const user = (0, validators_1.sameUserValidator)(request, userId, next);
        if (!user) {
            throw new Error(helpers_1.messages.userNotExistsMessage);
        }
        if (!request.file) {
            throw new Error(helpers_1.messages.noImageUploadedMessage);
        }
        const uploadedFile = request.file;
        // Upload the file to S3
        const awsResponse = yield (0, helpers_1.uploadAwsS3Object)(uploadedFile);
        const imageAwsLocation = awsResponse.Location;
        if (user.image) {
            yield (0, helpers_1.deleteAwsS3Object)(user.image.split('/').pop());
        }
        user.image = imageAwsLocation;
        user.save();
        // updating user details
        // const updatedUserData = await UserModel.findOneAndUpdate({ _id: userId }, body, {
        //   new: true,
        // });
        // Clean up locally uploaded file
        fs_1.default.unlinkSync(uploadedFile.path);
        // sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.userProfilePicUpdateSuccessMessage, {
            data: { user, location: imageAwsLocation },
        }, 201);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.userProfilePicUpdateFailedMessage));
    }
});
exports.uploadUserProfileImageController = uploadUserProfileImageController;
