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
exports.otpSchema = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const configs_1 = require("../configs");
// Defining a structure for OTP we want to store in the database
exports.otpSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isUsed: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: configs_1.OTP_EXPIRY_MINUTES * configs_1.SECONDS, // The document will be automatically deleted after given minutes of its creation time
    },
});
exports.otpSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Only send an email when a new document is created
            if (this.isNew) {
                // checking if user already registered
                const userExists = yield models_1.UserModel.findOne({ email: this.email });
                if (!userExists) {
                    throw new Error(helpers_1.messages.userNotExistsMessage);
                }
                // Send mail to email
                yield (0, helpers_1.sendGmail)((0, helpers_1.getGmailTemplate)(this.email, 'Verification of Email', (0, helpers_1.otpMailTemplate)(this.otp, userExists === null || userExists === void 0 ? void 0 : userExists.name)));
            }
        }
        catch (error) { }
        next();
    });
});
