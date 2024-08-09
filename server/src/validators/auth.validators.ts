import { Document } from 'mongoose';
import { IUser } from '../types';
import { messages } from '../helpers';

export const verifySameUserValidator = (
  user: Document<unknown, {}, IUser> &
    IUser &
    Required<{
      _id: unknown;
    }>,
  userId: string,
) => {
  if (user._id?.toString() !== userId && user?.isValidated) {
    throw new Error(messages.accessDeniedMessage);
  }
};
