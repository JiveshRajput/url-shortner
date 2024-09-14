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
exports.generateOtp = exports.verifyRefreshToken = exports.generateTokens = exports.getJwtPayload = exports.createRefreshTokenJwt = exports.createAccessTokenJwt = exports.decodeJwt = exports.verifyJwt = exports.createJwt = exports.compareHashKey = exports.hashKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const configs_1 = require("../configs");
const messages_1 = require("./messages");
const models_1 = require("../models");
const hashKey = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedKey = yield bcryptjs_1.default.hash(key, configs_1.BCRYPT_SALT);
    return hashedKey;
});
exports.hashKey = hashKey;
const compareHashKey = (key, hashedKey) => __awaiter(void 0, void 0, void 0, function* () {
    const comparedKey = yield bcryptjs_1.default.compare(key, hashedKey);
    return comparedKey;
});
exports.compareHashKey = compareHashKey;
const createJwt = (payload, expiresIn = configs_1.EXPIRES_IN_JWT, secret = process.env.JWT_SECRET_KEY) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
    return token;
};
exports.createJwt = createJwt;
const verifyJwt = (token, secret = process.env.JWT_SECRET_KEY) => {
    const isTokenVerified = jsonwebtoken_1.default.verify(token, secret);
    return isTokenVerified;
};
exports.verifyJwt = verifyJwt;
const decodeJwt = (token) => {
    const decodedToken = jsonwebtoken_1.default.decode(token, { complete: true });
    return decodedToken;
};
exports.decodeJwt = decodeJwt;
const createAccessTokenJwt = (payload, secret = process.env.ACCESS_TOKEN_SECRET_KEY, expiresIn = configs_1.EXPIRES_IN_ACCESS_TOKEN) => {
    return (0, exports.createJwt)(payload, expiresIn, secret);
};
exports.createAccessTokenJwt = createAccessTokenJwt;
const createRefreshTokenJwt = (payload, secret = process.env.REFRESH_TOKEN_SECRET_KEY, expiresIn = configs_1.EXPIRES_IN_REFRESH_TOKEN) => {
    return (0, exports.createJwt)(payload, expiresIn, secret);
};
exports.createRefreshTokenJwt = createRefreshTokenJwt;
const getJwtPayload = (user) => ({ userId: user._id, email: user.email });
exports.getJwtPayload = getJwtPayload;
const generateTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = (0, exports.getJwtPayload)(user);
        const accessToken = (0, exports.createAccessTokenJwt)(payload);
        const refreshToken = (0, exports.createRefreshTokenJwt)(payload);
        const refreshTokenExists = yield models_1.RefreshTokenModel.findOne({ userId: user._id });
        if (refreshTokenExists) {
            yield refreshTokenExists.deleteOne();
        }
        yield new models_1.RefreshTokenModel({ userId: user._id, token: refreshToken }).save();
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.generateTokens = generateTokens;
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshTokenExists = yield models_1.RefreshTokenModel.findOne({ token: refreshToken });
        if (!refreshTokenExists) {
            throw new Error(messages_1.messages.invalidTokenMessage);
        }
        return (0, exports.verifyJwt)(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
const generateOtp = (size = 4) => {
    return otp_generator_1.default.generate(size, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
    });
};
exports.generateOtp = generateOtp;
