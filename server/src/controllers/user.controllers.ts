import fs from 'fs';
import {
  CreateError,
  CreateResponse,
  deleteAwsS3Object,
  messages,
  uploadAwsS3Object,
} from '../helpers';
import { INextFunction, IRequest, IRequestHandler, IResponse, IResponseSuccess } from '../types';
import { sameUserValidator } from '../validators';

/**
 * This controller is used to update the user's profile pic and save in DB.
 * @param {IRequest} request: HTTP Request object
 * @param {IResponse} response: HTTP Response object
 * @param {INextFunction} next: Callback argument to the middleware function
 * @returns {Promise<void>}: Returns a promise
 */
export const uploadUserProfileImageController: IRequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    // destructuring data
    const { userId } = request.params;

    // checking if jwt userId and current userId is same or not
    const user = sameUserValidator(request, userId, next);

    if (!user) {
      throw new Error(messages.userNotExistsMessage);
    }

    if (!request.file) {
      throw new Error(messages.noImageUploadedMessage);
    }

    const uploadedFile: Express.Multer.File = request.file;

    // Upload the file to S3
    const awsResponse = await uploadAwsS3Object(uploadedFile);

    const imageAwsLocation = awsResponse.Location;

    if (user.image) {
      await deleteAwsS3Object(user.image.split('/').pop());
    }

    user.image = imageAwsLocation;
    user.save();

    // updating user details
    // const updatedUserData = await UserModel.findOneAndUpdate({ _id: userId }, body, {
    //   new: true,
    // });

    // Clean up locally uploaded file
    fs.unlinkSync(uploadedFile.path);

    // sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.userProfilePicUpdateSuccessMessage,
      {
        data: { user, location: imageAwsLocation },
      },
      201,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.userProfilePicUpdateFailedMessage));
  }
};
