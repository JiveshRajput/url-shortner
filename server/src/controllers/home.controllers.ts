import { PROJEC_NAME } from '../configs';
import {
  messages,
  CreateError,
  CreateResponse,
  hashKey,
  generateTokens,
} from '../helpers';
import { UserModel,  } from '../models';
import {
  INextFunction,
  IRequestHandler,
  IRequest,
  IResponse,
  IResponseSuccess,
} from '../types';

/**
 * This controller is used to register the user and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const appInfoController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const information = {
      name: PROJEC_NAME,
      about: 'URL Shortener is a web app used to save your URLs in shorter form',
    }

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.successMessage,
      {
        data: information
      }
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.failedMessage));
  }
};
