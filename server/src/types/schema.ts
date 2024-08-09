import { Document, Model, Schema } from 'mongoose';
import { IUserRole } from '.';

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
  role: IUserRole;
}

export interface IUserModel extends Model<IUser> {}

export interface IOtp extends Document {
  createdAt: NativeDate;
  email: string;
  otp: string;
}

export interface IOtpModel extends Model<IOtp> {}

export interface IRefreshToken extends Document {
  createdAt: NativeDate;
  token: string;
  userId: Schema.Types.ObjectId;
}

export interface IRefreshTokenModel extends Model<IRefreshToken> {}
