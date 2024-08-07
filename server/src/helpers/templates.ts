import Mail from 'nodemailer/lib/mailer';

export const sendOtpTemplate = (
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
