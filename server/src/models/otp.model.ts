import mongoose from 'mongoose';
import { otpSchema } from '../schemas';

const OtpModel = mongoose.model('OTP', otpSchema, 'OTP');

export default OtpModel;
