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
exports.mongoDbSetup = void 0;
const mongoose_1 = require("mongoose");
const mongoDbSetup = () => {
    const getMongoDBUrl = (url, username, password) => {
        var _a;
        return (_a = url === null || url === void 0 ? void 0 : url.replace('{username}', username)) === null || _a === void 0 ? void 0 : _a.replace('{password}', password);
    };
    const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
        const mongoDbUri = getMongoDBUrl(process.env.MONGODB_URI, process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD);
        yield (0, mongoose_1.connect)(mongoDbUri);
        console.log('MongoDB status: CONNECTED');
    });
    return { connectToDB };
};
exports.mongoDbSetup = mongoDbSetup;
