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
exports.getUrlStatsController = exports.getAllUrlController = exports.deleteUrlController = exports.updateUrlController = exports.createUrlController = exports.getClickUrlController = exports.getUrlController = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const validators_1 = require("../validators");
const getUrlController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueId } = request.params;
        const data = yield models_1.UrlModel.findOne({ shortUrl: uniqueId });
        if (!data) {
            throw new Error(helpers_1.messages.noDataFoundMessage);
        }
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.urlFetchSuccessMessage, {
            data,
        });
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.urlFetchErrorMessage));
    }
});
exports.getUrlController = getUrlController;
const getClickUrlController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueId } = request.params;
        const data = yield models_1.UrlModel.findOne({ shortUrl: uniqueId });
        if (!data) {
            throw new Error(helpers_1.messages.noDataFoundMessage);
        }
        data.clicks += 1;
        yield data.save();
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.urlFetchSuccessMessage, {
            data,
        });
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.urlFetchErrorMessage));
    }
});
exports.getClickUrlController = getClickUrlController;
const createUrlController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl, shortUrl, clicks, userId } = request.body;
        // checking if jwt userId and current userId is same or not
        const user = (0, validators_1.sameUserValidator)(request, userId, next);
        if (!user) {
            throw new Error(helpers_1.messages.accessDeniedMessage);
        }
        if (clicks) {
            throw new Error(helpers_1.messages.urlCannotAddClicksWhileCreatingMessage);
        }
        if (!(0, validators_1.isUrlValid)(fullUrl)) {
            throw new Error(helpers_1.messages.urlInvalidMessage);
        }
        if (shortUrl) {
            const isAlreadyExists = yield models_1.UrlModel.findOne({ shortUrl });
            if (isAlreadyExists) {
                throw new Error(helpers_1.messages.urlAlreadyExistsMessage);
            }
        }
        const newShortenUrl = yield models_1.UrlModel.create(request.body);
        yield models_1.UserModel.updateOne({ _id: userId }, { $push: { urls: newShortenUrl._id } });
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.urlCreateSuccessMessage, {
            data: newShortenUrl,
        }, 201);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.urlCreateErrorMessage));
    }
});
exports.createUrlController = createUrlController;
const updateUrlController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueId } = request.params;
        const { fullUrl, shortUrl, clicks, isActive, userId } = request.body;
        // checking if jwt userId and current userId is same or not
        const user = (0, validators_1.sameUserValidator)(request, userId, next);
        if (!user) {
            throw new Error(helpers_1.messages.accessDeniedMessage);
        }
        const data = yield models_1.UrlModel.findOne({ shortUrl: uniqueId });
        if (!data) {
            throw new Error(helpers_1.messages.urlNotExistsMessage);
        }
        if (shortUrl && data.shortUrl !== shortUrl) {
            const isAlreadyExists = yield models_1.UrlModel.findOne({ shortUrl });
            if (isAlreadyExists) {
                throw new Error(helpers_1.messages.urlAlreadyExistsMessage);
            }
            data.shortUrl = shortUrl;
        }
        if (fullUrl) {
            if (!(0, validators_1.isUrlValid)(fullUrl)) {
                throw new Error(helpers_1.messages.urlInvalidMessage);
            }
            data.fullUrl = fullUrl;
        }
        if (clicks) {
            data.clicks = clicks;
        }
        if (isActive != undefined) {
            data.isActive = isActive;
        }
        yield data.save();
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.urlUpdateSuccessMessage);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.urlUpdateErrorMessage));
    }
});
exports.updateUrlController = updateUrlController;
const deleteUrlController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueId } = request.params;
        const { userId } = request.body;
        // checking if jwt userId and current userId is same or not
        const user = (0, validators_1.sameUserValidator)(request, userId, next);
        if (!user) {
            throw new Error(helpers_1.messages.accessDeniedMessage);
        }
        const data = yield models_1.UrlModel.findOne({ shortUrl: uniqueId });
        if (!data) {
            throw new Error(helpers_1.messages.urlNotExistsMessage);
        }
        yield data.deleteOne();
        yield models_1.UserModel.updateOne({ _id: userId }, { $pull: { urls: data._id } });
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.urlDeleteSuccessMessage);
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.urlDeleteErrorMessage));
    }
});
exports.deleteUrlController = deleteUrlController;
const getAllUrlController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = request.params;
        // checking if jwt userId and current userId is same or not
        const user = (0, validators_1.sameUserValidator)(request, userId, next);
        if (!user) {
            throw new Error(helpers_1.messages.accessDeniedMessage);
        }
        const userData = yield models_1.UserModel.aggregate([
            {
                $match: { _id: user._id },
            },
            {
                $lookup: { from: 'url', as: 'urls', localField: 'urls', foreignField: '_id' },
            },
        ]);
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.urlFetchSuccessMessage, {
            data: (_a = userData[0]) === null || _a === void 0 ? void 0 : _a.urls,
        });
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.urlFetchErrorMessage));
    }
});
exports.getAllUrlController = getAllUrlController;
const getUrlStatsController = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { userId } = request.params;
        // checking if jwt userId and current userId is same or not
        const user = (0, validators_1.sameUserValidator)(request, userId, next);
        if (!user) {
            throw new Error(helpers_1.messages.accessDeniedMessage);
        }
        const userData = yield models_1.UserModel.aggregate([
            {
                $match: { _id: user._id },
            },
            {
                $lookup: { from: 'url', as: 'urls', localField: 'urls', foreignField: '_id' },
            },
        ]);
        const userUrls = (_a = userData[0]) === null || _a === void 0 ? void 0 : _a.urls;
        const data = {
            totalLinks: userUrls.length,
            activeLinks: ((_b = userUrls === null || userUrls === void 0 ? void 0 : userUrls.filter(({ isActive }) => isActive)) === null || _b === void 0 ? void 0 : _b.length) || 0,
            inActiveLinks: ((_c = userUrls === null || userUrls === void 0 ? void 0 : userUrls.filter(({ isActive }) => !isActive)) === null || _c === void 0 ? void 0 : _c.length) || 0,
            totalClicks: (userUrls === null || userUrls === void 0 ? void 0 : userUrls.reduce((prev, { clicks }) => prev + clicks, 0)) || 0,
            recentLinks: userUrls.reverse().slice(0, 5),
        };
        // Sending success response
        const responseMessage = helpers_1.CreateResponse.success(helpers_1.messages.urlFetchSuccessMessage, {
            data,
        });
        response.status(responseMessage.statusCode).json(responseMessage);
    }
    catch (error) {
        next(helpers_1.CreateError.clientError((error === null || error === void 0 ? void 0 : error.message) || helpers_1.messages.urlFetchErrorMessage));
    }
});
exports.getUrlStatsController = getUrlStatsController;
