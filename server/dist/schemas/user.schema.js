"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
const { ADMIN, USER, VISITOR } = types_1.IUserRole;
// Defining a structure for the data we want to store in the database
exports.userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: [true, 'Email should be unique'],
    },
    number: {
        type: Number,
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    isValidated: {
        type: Boolean,
        default: false,
        required: [true, 'isValidated required'],
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password required'],
    },
    role: {
        type: String,
        enum: [ADMIN, USER, VISITOR],
        required: [true, 'Role required'],
        default: 'USER',
    },
    urls: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: [],
    },
}, { timestamps: true });
