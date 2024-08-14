import { IResponseSuccess, IResponseError, IStatusType } from '../types';
import { messages } from './messages';

// Success response object pattern
export class CreateResponse {
  static success(
    message: string = messages.successMessage,
    data: object = {},
    statusCode: number = 200,
  ): IResponseSuccess {
    return { message, statusCode, status: IStatusType.OK, ...data };
  }
}

// Error response object pattern
export class CreateError {
  static clientError(
    message: string = messages.clientSideErrorMessage,
    statusCode: number = 400,
  ): IResponseError {
    return { message, statusCode, status: IStatusType.FAIL };
  }

  static serverError(
    message: string = messages.serverSideErrorMessage,
    statusCode: number = 500,
  ): IResponseError {
    return { message, statusCode, status: IStatusType.FAIL };
  }
}
