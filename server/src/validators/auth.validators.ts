import { INextFunction, IRequest, IUser } from '../types';
import { CreateError, messages } from '../helpers';

export const sameUserValidator = (request: IRequest, userId: string, next: INextFunction) => {
  try {
    const { user } = request as IRequest & { user: IUser };

    if (!userId) {
      throw new Error(messages.userIdNotExistsMessage);
    }

    if (user._id?.toString() !== userId && !user?.isValidated) {
      throw new Error(messages.accessDeniedMessage);
    }

    return user;
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.accessDeniedMessage, 401));
  }
};
