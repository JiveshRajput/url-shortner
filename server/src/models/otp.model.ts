import { model } from 'mongoose';
import { otpSchema } from '../schemas';
import { IOtp, IOtpModel } from '../types';

const OtpModel: IOtpModel = model<IOtp, IOtpModel>('OTP', otpSchema, 'otp');

export default OtpModel;
