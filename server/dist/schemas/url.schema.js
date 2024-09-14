"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlSchema = void 0;
const mongoose_1 = require("mongoose");
const shortid_1 = __importDefault(require("shortid"));
// Defining a structure for the data we want to store in the database
exports.urlSchema = new mongoose_1.Schema({
    fullUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        index: true,
        default: shortid_1.default.generate,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: true });
