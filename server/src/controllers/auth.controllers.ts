import { JwtPayload } from 'jsonwebtoken';
import {
  compareHashKey,
  messages,
  CreateError,
  CreateResponse,
  hashKey,
  generateOtp,
  generateTokens,
  verifyRefreshToken,
  createAccessTokenJwt,
  getJwtPayload,
} from '../helpers';
import { UserModel, OtpModel, RefreshTokenModel } from '../models';
import { verifySameUserValidator } from '../validators';
import {
  INextFunction,
  IRequestHandler,
  IRequest,
  IResponse,
  IResponseSuccess,
  IUser,
} from '../types';

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

    // Creating JWT Tokens
    const { accessToken, refreshToken } = await generateTokens(userData);

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.registerSuccessMessage,
      {
        data: userData,
        accessToken,
        refreshToken,
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
    verifySameUserValidator(middlewareUser, userId, next);

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
    verifySameUserValidator(middlewareUser, userId, next);

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

    // Creating JWT Tokens
    const { accessToken, refreshToken } = await generateTokens(userData);

    // Sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.loginSuccessfulMessage,
      {
        data: userData,
        accessToken,
        refreshToken,
      },
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.loginFailedMessage));
  }
};

/**
 * This controller is used to logout the user.
 * It returns a token in response.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<IResponse | undefined>}: Returns a promise
 */
export const logoutUserController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<IResponse | undefined> => {
  try {
    const { refreshToken } = request.body;

    // Checking are values present
    if (!refreshToken) {
      throw new Error(messages.missingRefreshToknMessage);
    }

    // Finding refresh token
    const userRefreshToken = await RefreshTokenModel.findOne({ token: refreshToken });

    // Creating success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.logoutSuccessfulMessage,
    );

    // Checking if refresh token exists
    if (!userRefreshToken) {
      // Sending success response
      return response.status(responseMessage.statusCode).json(responseMessage);
    }

    // Deleting refresh token
    await userRefreshToken.deleteOne();

    // Sending success response
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.logoutFailedMessage, 401));
  }
};

/**
 * This controller is used to get access token from refresh token.
 * It returns a token in response.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const getAccessTokenController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { refreshToken } = request.body;

    // Checking are values present
    if (!refreshToken) {
      throw new Error(messages.missingRefreshToknMessage);
    }

    // Verify refresh token
    const result = await verifyRefreshToken(refreshToken);
    if (!result) {
      throw new Error(messages.tokenNotVerifiedMessage);
    }
    const { userId, email } = result as JwtPayload;
    const payload = { _id: userId, email };

    // Creating access token
    const accessToken = createAccessTokenJwt(getJwtPayload(payload as Partial<IUser>));

    // Creating success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.accessTokenCreatedSuccessMessage,
      {
        data: { accessToken },
      },
    );

    // Sending success response
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.accessTokenCreatedFailedMessage, 401));
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
    const { password, oldPassword } = request.body;

    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    const { user: middlewareUser } = request;

    // checking if jwt userId and current userId is same or not
    verifySameUserValidator(middlewareUser, userId, next);

    // Checking old password is same or not
    const isOldPasswordCorrect = await compareHashKey(oldPassword, middlewareUser?.password);
    if (!isOldPasswordCorrect) {
      throw new Error(messages.oldPasswordWrongMessage);
    }

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
    next(CreateError.clientError(error?.message || messages.passwordResetFailedMessage));
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
    verifySameUserValidator(middlewareUser, userId, next);

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.tokenAuthenticatedSuccessMessage,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.tokenAuthenticatedFailedMessage, 401));
  }
};

/**
 * This controller is used to send OTP on registered user's mail.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const sendOtpController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    const { user } = request;

    // Check if user already verified or not
    if (user?.isValidated) {
      throw new Error(messages.alreadyVerifiedMessage);
    }

    // finding unqiue OTP.
    let otp = generateOtp();
    let isOtpExists = await OtpModel.findOne({ otp: otp });
    while (isOtpExists) {
      otp = generateOtp();
      isOtpExists = await OtpModel.findOne({ otp });
    }

    const result = await OtpModel.create({
      email: user.email,
      otp,
    });

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.otpSentSuccessMessage,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.otpSentFailureMessage));
  }
};

/**
 * This controller is used to verify the email for registered user.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const verifyOtpController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    // destructuring data otp, email
    const { otp, userId } = request.body;

    // @ts-expect-error Property 'user' does not exist on type 'IRequest'.
    const { user } = request;

    // Check if user already verified or not
    if (user?.isValidated) {
      throw new Error(messages.alreadyVerifiedMessage);
    }

    // checking if jwt userId and current userId is same or not
    verifySameUserValidator(user, userId, next);

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
    next(CreateError.clientError(error?.message || messages.otpValidFailureMessage));
  }
};
