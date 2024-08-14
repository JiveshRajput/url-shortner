import mongoose from 'mongoose';
import { otpSchema } from '../schemas';
import { IOtp, IOtpModel } from '../types';

export const OtpModel: IOtpModel = mongoose.model<IOtp, IOtpModel>('OTP', otpSchema, 'otp');
