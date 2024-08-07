import nodemailer, { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Transporter for sending mail
export const createGmailTransporter = (
  user: string = process.env.NODEMAILER_EMAIL as string,
  pass: string = process.env.NODEMAILER_PASSWORD as string,
): Transporter<SMTPTransport.SentMessageInfo> => {
  const transporter: Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  return transporter;
};

export const sendGmail = async (options: Mail.Options) => {
  const transporter: Transporter<SMTPTransport.SentMessageInfo> = createGmailTransporter();
  const mailInfo: SMTPTransport.SentMessageInfo = await transporter.sendMail(options);
  return mailInfo;
};
