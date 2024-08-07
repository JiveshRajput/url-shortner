import {
  compareHashKey,
  createJwt,
  messages,
  CreateError,
  CreateResponse,
  hashKey,
} from '../helpers';
import { UserModel } from '../models';
import {
  ControllerMiddlewareType,
  INextFunction,
  IRequest,
  IResponse,
  IResponseSuccess,
} from '../types';

// TODO: Create verify OTP, generate OTP APIs

/**
 * This controller is used to register the user and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const registerUserController: ControllerMiddlewareType = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
) => {
  try {
    // destructuring data
    const { number, password, name, email } = request.body;

    // validating required fields
    if (!(number && password)) {
      throw new Error(messages.missingCredentialsMessage);
    }

    // checking if user already registered
    const userExists = await UserModel.findOne({ number });
    if (userExists) {
      throw new Error(messages.userExistsMessage);
    }

    // registering a user
    const userData = await UserModel.create({
      number,
      name,
      email,
      password: await hashKey(password),
    });

    // Creating JWT Token
    const token: string = createJwt({
      userId: userData._id,
      number: userData.number,
    });

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.registerSuccessMessage,
      {
        data: userData,
        token,
      },
      201,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.registerFailedMessage, 401));
  }
};

/**
 * This controller is used to update the user's details and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const updateUserController: ControllerMiddlewareType = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
) => {
  try {
    // destructuring data
    const { userId } = request.params;
    const body = request.body;
    const { number, password } = body;

    // checking if user already registered
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error(messages.userNotExistsMessage);
    }

    // checking if password is present in payload
    if (password) {
      throw new Error(messages.cannotUpdatePasswordMessage);
    }

    // checking number already exists or not
    if (!(number && number !== user.number)) {
      const numberExists = await UserModel.findOne({ number });
      if (numberExists) {
        throw new Error(messages.numberExistsMessage);
      }
    }

    // updating user details
    const updatedUserData = await UserModel.findOneAndUpdate({ _id: userId }, body, {
      new: true,
    });

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.userDetailsUpdateSuccessMessage,
      {
        data: updatedUserData,
      },
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.userDetailsUpdateFailedMessage));
  }
};

/**
 * This controller is used to get user's details.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const getUserController: ControllerMiddlewareType = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
) => {
  try {
    // destructuring data
    const { userId } = request.params;

    // checking if user already registered
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error(messages.userNotExistsMessage);
    }

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.getUserDetailsSuccessMessage,
      {
        data: user,
      },
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.getUserDetailsFailedMessage));
  }
};

/**
 * This controller is used to login the user.
 * It returns a token in response.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const loginUserController: ControllerMiddlewareType = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
) => {
  try {
    const { number, password } = request.body;

    // Checking are values present
    if (!(number && password)) {
      throw new Error(messages.missingCredentialsMessage);
    }

    // Checking user
    const userData = await UserModel.findOne({ number });
    if (!userData) {
      throw new Error(messages.userNotRegisteredMessage);
    }

    // Checking password
    const isPasswordCorrect = await compareHashKey(password, userData.password);
    if (!isPasswordCorrect) {
      throw new Error(messages.wrongCredentialsMessage);
    }

    // Creating JWT Token
    const token = createJwt({ userId: userData._id, number: userData.number });

    // Sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.loginSuccessfulMessage,
      {
        data: userData,
        token,
      },
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.loginFailedMessage, 401));
  }
};

/**
 * This controller is used to reset the password of user.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const resetPasswordController: ControllerMiddlewareType = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
) => {
  try {
    const { number, password } = request.body;

    // Checking are values present
    if (!(number && password)) {
      throw new Error(messages.missingCredentialsMessage);
    }

    // Checking user
    const userData = await UserModel.findOne({ number });
    if (!userData) {
      throw new Error(messages.userNotRegisteredMessage);
    }

    // Hashing the password and saving it
    userData.password = await hashKey(password);
    await userData.save();

    // Sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.passwordResetSuccessMessage,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.passwordResetFailedMessage, 401));
  }
};

/**
 * This controller is used to authenticate the user.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const authenticateUserController: ControllerMiddlewareType = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
) => {
  try {
    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.tokenAuthenticatedSuccessMessage,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.tokenAuthenticatedFailedMessage, 403));
  }
};

