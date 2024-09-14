import { ADMIN_EMAIL, PROJECT_NAME } from '../configs';
import {
  CreateError,
  CreateResponse,
  enquiryMailTemplate,
  getGmailTemplate,
  messages,
  sendGmail,
} from '../helpers';
import { INextFunction, IRequest, IRequestHandler, IResponse, IResponseSuccess } from '../types';

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
      name: PROJECT_NAME,
      about: 'URL Shortener is a web app used to save your URLs in shorter form',
    };

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(messages.successMessage, {
      data: information,
    });
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.failedMessage));
  }
};

/**
 * This controller is used to register the user and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const submitEnquiryController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { name, email, message, number } = request.body;
    await sendGmail(
      getGmailTemplate(
        ADMIN_EMAIL,
        `${PROJECT_NAME} | Form Enquiry by ${name}`,
        enquiryMailTemplate(name, email, number, message),
      ),
    );

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.enquiryFormSubmittedSuccessMessage,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.enquiryFormSubmittedErrorMessage));
  }
};
