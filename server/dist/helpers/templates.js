"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpMailTemplate = exports.getGmailTemplate = void 0;
const configs_1 = require("../configs");
const getGmailTemplate = (mail, subject, html, options = {}) => {
    return Object.assign({ from: process.env.NODEMAILER_EMAIL, to: mail, subject,
        html }, options);
};
exports.getGmailTemplate = getGmailTemplate;
const otpMailTemplate = (otp, username = 'User') => {
    return `
    <div style="text-align: left;">
      <h1 style="margin: 1rem 0">Verification code</h1>
      <p style="padding-bottom: 10px">Dear ${username}! Please use the verification code below to sign in ${configs_1.PROJEC_NAME}.</p>
      <p style="padding-bottom: 10px"><strong style="font-size: 130%">${otp}</strong></p>
      <p style="padding-bottom: 10px">If you didn’t request this, you can ignore this email.</p>
      <p style="padding-bottom: 10px">Thanks,<br>${configs_1.PROJEC_NAME} team</p>
    </div>
  `;
};
exports.otpMailTemplate = otpMailTemplate;
