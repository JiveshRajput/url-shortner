import { Schema } from 'mongoose';
import { getGmailTemplate, otpMailTemplate } from '../helpers/templates';
import { sendGmail } from '../helpers/mail';
import { messages } from '../helpers';
import { UserModel } from '../models';

// Defining a structure for OTP we want to store in the database
const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

otpSchema.pre('save', async function (next) {
  try {
    // Only send an email when a new document is created
    if (this.isNew) {
      // checking if user already registered
      const userExists = await UserModel.findOne({ email: this.email });
      if (!userExists) {
        throw new Error(messages.userNotExistsMessage);
      }

      // Send mail to email
      await sendGmail(
        getGmailTemplate(
          this.email,
          'Verification of Email',
          otpMailTemplate(this.otp, userExists?.name),
        ),
      );
    }
  } catch (error: any) {}
  next();
});

export default otpSchema;
