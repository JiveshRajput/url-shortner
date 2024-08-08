import {
  compareHashKey,
  createJwt,
  messages,
  CreateError,
  CreateResponse,
  hashKey,
} from '../helpers';
import { generateOtp } from '../helpers/auth';
import { sendGmail } from '../helpers/mail';
import { getGmailTemplate, otpMailTemplate } from '../helpers/templates';
import { UserModel } from '../models';
import OtpModel from '../models/otp.model';
import { INextFunction, IRequestHandler, IRequest, IResponse, IResponseSuccess } from '../types';
import { verifySameUserValidator } from '../validators';

// TODO: Create verify OTP, generate OTP APIs

/**
 * This controller is used to register the user and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const registerUserController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    // destructuring data
    const { password, email } = request.body;

    // validating required fields
    if (!(email && password)) {
      throw new Error(messages.missingCredentialsMessage);
    }

    // checking if user already registered
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      throw new Error(messages.userExistsMessage);
    }

    // registering a user
    const userData = await UserModel.create({
      ...request.body,
      password: await hashKey(password),
    });

    // Creating JWT Token
    const token: string = createJwt({
      userId: userData._id,
      email: userData.email,
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
export const updateUserController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    // destructuring data
    const { userId } = request.params;

    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    const { user: middlewareUser } = request;

    // checking if jwt userId and current userId is same or not
    verifySameUserValidator(middlewareUser, userId);

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
export const getUserController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    // destructuring data
    const { userId } = request.params;

    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    const { user: middlewareUser } = request;

    // checking if jwt userId and current userId is same or not
    verifySameUserValidator(middlewareUser, userId);

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
export const loginUserController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { email, password } = request.body;

    // Checking are values present
    if (!(email && password)) {
      throw new Error(messages.missingCredentialsMessage);
    }

    // Checking user
    const userData = await UserModel.findOne({ email });
    if (!userData) {
      throw new Error(messages.userNotRegisteredMessage);
    }

    // Checking password
    const isPasswordCorrect = await compareHashKey(password, userData.password);
    if (!isPasswordCorrect) {
      throw new Error(messages.wrongCredentialsMessage);
    }

    // Creating JWT Token
    const token = createJwt({ userId: userData._id, email: userData.email });

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
export const resetPasswordController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { userId } = request.params;
    const { password } = request.body;

    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    const { user: middlewareUser } = request;

    // checking if jwt userId and current userId is same or not
    verifySameUserValidator(middlewareUser, userId);

    // Checking are values present
    if (!(userId && password)) {
      throw new Error(messages.missingCredentialsMessage);
    }

    // Checking user
    const userData = await UserModel.findById(userId);
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
export const authenticateUserController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { userId } = request.body;

    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    const { user: middlewareUser } = request;

    // checking if jwt userId and current userId is same or not
    verifySameUserValidator(middlewareUser, userId);

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.tokenAuthenticatedSuccessMessage,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.tokenAuthenticatedFailedMessage, 403));
  }
};

/**
 * This controller is used to send OTP on registered user's mail.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const sendOtpMailController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    const { user } = request;

    // finding unqiue OTP.
    let otp = generateOtp();
    let isOtpExists = await OtpModel.findOne({ otp: otp });
    while (isOtpExists) {
      otp = generateOtp();
      isOtpExists = await OtpModel.findOne({ otp });
    }

    const result = await OtpModel.create({
      email: user.email,
      otp: generateOtp(),
    });

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.otpSentSuccessMessage,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.otpSentFailureMessage, 403));
  }
};

/**
 * This controller is used to verify the email for registered user.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const verifyUserController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    // destructuring data otp, email
    const { otp, userId } = request.body;

    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    const { user } = request;

    // checking if jwt userId and current userId is same or not
    verifySameUserValidator(user, userId);

    // Find the most recent OTP for the email
    const otpResponse = await OtpModel.find({ email: user?.email })
      .sort({ createdAt: -1 })
      .limit(1);

    // matching the OTP value
    if (otpResponse.length === 0 || otp !== otpResponse[0].otp) {
      throw new Error(messages.otpValidFailureMessage);
    }

    // if otp matched, updating user's detail and saving isValidated to true
    const userResponse = await UserModel.findById(userId);
    if (!userResponse) {
      throw new Error(messages.userNotExistsMessage);
    }
    userResponse.isValidated = true;

    await userResponse.save();
    
    // Deleting OTP
    await otpResponse[0].deleteOne();

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.otpValidSuccessMessage,
      { data: userResponse },
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.registerFailedMessage, 401));
  }
};
