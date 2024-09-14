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
exports.sendGmail = exports.createGmailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Transporter for sending mail
const createGmailTransporter = (user = process.env.NODEMAILER_EMAIL, pass = process.env.NODEMAILER_PASSWORD) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: { user, pass },
    });
    return transporter;
};
exports.createGmailTransporter = createGmailTransporter;
const sendGmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = (0, exports.createGmailTransporter)();
    const mailInfo = yield transporter.sendMail(options);
    return mailInfo;
});
exports.sendGmail = sendGmail;
