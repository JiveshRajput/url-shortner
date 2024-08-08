import Mail from 'nodemailer/lib/mailer';
import { PROJEC_NAME } from '../configs';

export const getGmailTemplate = (
  mail: string,
  subject: string,
  html: string,
  options: Mail.Options = {},
): Mail.Options => {
  return {
    from: process.env.NODEMAILER_EMAIL as string,
    to: mail,
    subject,
    html,
    ...options,
  };
};

export const otpMailTemplate = (otp: number | string, username: string = 'User') => {
  return `
    <div style="text-align: left;">
      <h1 style="margin: 1rem 0">Verification code</h1>
      <p style="padding-bottom: 10px">Dear ${username}! Please use the verification code below to sign in ${PROJEC_NAME}.</p>
      <p style="padding-bottom: 10px"><strong style="font-size: 130%">${otp}</strong></p>
      <p style="padding-bottom: 10px">If you didn’t request this, you can ignore this email.</p>
      <p style="padding-bottom: 10px">Thanks,<br>${PROJEC_NAME} team</p>
    </div>
  `;
};
