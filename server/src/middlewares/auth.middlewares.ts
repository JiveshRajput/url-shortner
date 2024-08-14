import { JwtPayload } from 'jsonwebtoken';
import { CreateError, decodeJwt, messages, verifyJwt } from '../helpers';
import { INextFunction, IRequest, IRequestHandler, IResponse } from '../types';
import { UserModel } from '../models';

/**
 * This middleware is used to verify the jwt token.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const verifyTokenMiddleware: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
) => {
  try {
    // Finding token
    const tokenWithPrefix = request.headers.authorization;
    const token = tokenWithPrefix?.split(' ')[1];
    if (!token) {
      throw new Error(messages.tokenNotExistsMessage);
    }

    // Verifying token
    const isTokenVerified = verifyJwt(token);
    if (!isTokenVerified) {
      throw new Error(messages.tokenExpiredMessage);
    }

    // Verifying user
    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
      throw new Error(messages.tokenNotVerifiedMessage);
    }

    // Getting payload from token and verifying it
    const { payload } = decodedToken;
    const { userId } = payload as JwtPayload;
    const userData = await UserModel.findById(userId);

    if (!userData) {
      throw new Error(messages.tokenNotVerifiedMessage);
    }

    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    request.user = userData;

    // Go to next
    next();
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.tokenNotVerifiedMessage, 401));
  }
};
