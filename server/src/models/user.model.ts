import mongoose from 'mongoose';
import { userSchema } from '../schemas';

const UserModel = mongoose.model('user', userSchema, 'user');

export default UserModel;
