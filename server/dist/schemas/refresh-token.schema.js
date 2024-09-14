"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = void 0;
const mongoose_1 = require("mongoose");
const configs_1 = require("../configs");
exports.refreshTokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: configs_1.DAYS * configs_1.HOURS * configs_1.MINUTES * configs_1.SECONDS, // The document will be automatically deleted after 30 days of its creation time
    },
});
