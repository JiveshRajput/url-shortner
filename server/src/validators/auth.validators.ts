import { Document } from 'mongoose';
import { INextFunction, IUser } from '../types';
import { CreateError, messages } from '../helpers';

export const verifySameUserValidator = (
  user: Document<unknown, {}, IUser> &
    IUser &
    Required<{
      _id: unknown;
    }>,
  userId: string,
  next: INextFunction,
) => {
  try {
    if (user._id?.toString() !== userId && !user?.isValidated) {
      throw new Error(messages.accessDeniedMessage);
    }
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.accessDeniedMessage, 401));
  }
};
