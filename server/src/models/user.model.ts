import { model } from 'mongoose';
import { userSchema } from '../schemas';
import { IUserModel, IUser } from '../types';

const UserModel: IUserModel = model<IUser, IUserModel>('user', userSchema, 'user');

export default UserModel;
