import Mail from 'nodemailer/lib/mailer';
import { PROJECT_NAME } from '../configs';

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
      <p style="padding-bottom: 10px">Dear ${username}! Please use the verification code below to sign in ${PROJECT_NAME}.</p>
      <p style="padding-bottom: 10px"><strong style="font-size: 130%">${otp}</strong></p>
      <p style="padding-bottom: 10px">If you didn’t request this, you can ignore this email.</p>
      <p style="padding-bottom: 10px">Thanks,<br>${PROJECT_NAME} team</p>
    </div>
  `;
};

export const enquiryMailTemplate = (
  name: string,
  email: string,
  number: string | number,
  message: string,
) => {
  return `
    <div style="text-align: left;">
      <h1 style="margin: 1rem 0">Equiry on ${PROJECT_NAME}</h1>
      <p style="padding-bottom: 10px">Name: ${name}</p>
      <p style="padding-bottom: 10px">Email: ${email}</p>
      <p style="padding-bottom: 10px">Number: ${number}</p>
      <p style="padding-bottom: 10px">Message: ${message}</p>
      
      <p style="padding-bottom: 10px">Thanks,<br>${PROJECT_NAME} team</p>
    </div>
  `;
};
