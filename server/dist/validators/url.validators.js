"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrlValid = void 0;
const valid_url_1 = __importDefault(require("valid-url"));
const isUrlValid = (url) => {
    if (valid_url_1.default.isUri(url)) {
        return true;
    }
    return false;
};
exports.isUrlValid = isUrlValid;
