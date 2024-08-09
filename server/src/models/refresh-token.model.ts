import mongoose from 'mongoose';
import { refreshTokenSchema } from '../schemas';
import { IRefreshToken, IRefreshTokenModel } from '../types';

export const RefreshTokenModel: IRefreshTokenModel = mongoose.model<
  IRefreshToken,
  IRefreshTokenModel
>('refresh-token', refreshTokenSchema, 'refresh-token');
