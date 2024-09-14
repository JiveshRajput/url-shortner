"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONTHS = exports.MONTH = exports.DAYS = exports.HOURS = exports.MINUTES = exports.SECONDS = exports.OTP_EXPIRY_MINUTES = exports.ADMIN_EMAIL = exports.PROJECT_NAME = exports.EXPIRES_IN_REFRESH_TOKEN = exports.EXPIRES_IN_ACCESS_TOKEN = exports.EXPIRES_IN_JWT = exports.PORT = exports.BCRYPT_SALT = void 0;
__exportStar(require("./mongo-db-setup"), exports);
__exportStar(require("./initial-app-setup"), exports);
exports.BCRYPT_SALT = 10;
exports.PORT = 8080;
exports.EXPIRES_IN_JWT = '1h';
exports.EXPIRES_IN_ACCESS_TOKEN = '1d';
exports.EXPIRES_IN_REFRESH_TOKEN = '30d';
exports.PROJECT_NAME = 'URL Shortner';
exports.ADMIN_EMAIL = 'jsoperatorz@gmail.com';
exports.OTP_EXPIRY_MINUTES = 5;
exports.SECONDS = 60;
exports.MINUTES = 60;
exports.HOURS = 24;
exports.DAYS = 30;
exports.MONTH = exports.DAYS * exports.HOURS * exports.MINUTES * exports.SECONDS;
exports.MONTHS = 12;
