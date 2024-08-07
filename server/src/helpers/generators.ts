import otpGenerator from 'otp-generator';
import nodeMailer from 'nodemailer';

export const generateOtp = () => {
  return otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
};
