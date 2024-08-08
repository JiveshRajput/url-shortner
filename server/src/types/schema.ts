import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  createdAt: NativeDate;
  updatedAt: NativeDate;
  password: string;
  email: string;
  number?: number | undefined;
  name?: string | undefined;
  age?: number | undefined;
  isValidated?: boolean | undefined;
  image?: string | undefined;
}

export interface IUserModel extends Model<IUser> {}

export interface IOtp extends Document {
  createdAt: NativeDate;
  email: string;
  otp: string;
}

export interface IOtpModel extends Model<IOtp> {}
