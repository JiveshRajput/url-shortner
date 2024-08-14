import mongoose from 'mongoose';
import { userSchema } from '../schemas';
import { IUserModel, IUser } from '../types';

export const UserModel: IUserModel = mongoose.model<IUser, IUserModel>('user', userSchema, 'user');
