"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemas_1 = require("../schemas");
exports.OtpModel = mongoose_1.default.model('OTP', schemas_1.otpSchema, 'otp');
