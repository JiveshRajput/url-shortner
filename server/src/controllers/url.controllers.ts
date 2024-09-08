import { RequestHandler } from 'express';
import { CreateError, CreateResponse, messages } from '../helpers';
import { UrlModel, UserModel } from '../models';
import { INextFunction, IRequest, IResponse, IResponseSuccess, IUrl } from '../types';
import { isUrlValid, sameUserValidator } from '../validators';

export const getUrlController: RequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { uniqueId } = request.params;
    const data = await UrlModel.findOne({ shortUrl: uniqueId });

    if (!data) {
      throw new Error(messages.noDataFoundMessage);
    }

    data.clicks += 1;
    await data.save();

    // Sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.urlFetchSuccessMessage,
      {
        data,
      },
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.urlFetchErrorMessage));
  }
};

export const createUrlController: RequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { fullUrl, shortUrl, clicks, userId } = request.body;

    // checking if jwt userId and current userId is same or not
    const user = sameUserValidator(request, userId, next);
    if (!user) {
      throw new Error(messages.accessDeniedMessage);
    }

    if (clicks) {
      throw new Error(messages.urlCannotAddClicksWhileCreatingMessage);
    }

    if (!isUrlValid(fullUrl)) {
      throw new Error(messages.urlInvalidMessage);
    }

    if (shortUrl) {
      const isAlreadyExists = await UrlModel.findOne({ shortUrl });
      if (isAlreadyExists) {
        throw new Error(messages.urlAlreadyExistsMessage);
      }
    }

    const newShortenUrl = await UrlModel.create(request.body);

    await UserModel.updateOne({ _id: userId }, { $push: { urls: newShortenUrl._id } });

    // Sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.urlCreateSuccessMessage,
      {
        data: newShortenUrl,
      },
      201,
    );

    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.urlCreateErrorMessage));
  }
};

export const updateUrlController: RequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { uniqueId } = request.params;
    const { fullUrl, shortUrl, clicks, isActive, userId } = request.body;

    // checking if jwt userId and current userId is same or not
    const user = sameUserValidator(request, userId, next);
    if (!user) {
      throw new Error(messages.accessDeniedMessage);
    }

    const data = await UrlModel.findOne({ shortUrl: uniqueId });
    if (!data) {
      throw new Error(messages.urlNotExistsMessage);
    }

    if (shortUrl && data.shortUrl !== shortUrl) {
      const isAlreadyExists = await UrlModel.findOne({ shortUrl });
      if (isAlreadyExists) {
        throw new Error(messages.urlAlreadyExistsMessage);
      }
      data.shortUrl = shortUrl;
    }

    if (fullUrl) {
      if (!isUrlValid(fullUrl)) {
        throw new Error(messages.urlInvalidMessage);
      }
      data.fullUrl = fullUrl;
    }

    if (clicks) {
      data.clicks = clicks;
    }

    if (isActive) {
      data.isActive = isActive;
    }

    await data.save();

    // Sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.urlUpdateSuccessMessage,
    );

    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.urlUpdateErrorMessage));
  }
};

export const deleteUrlController: RequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { uniqueId } = request.params;
    const { userId } = request.body;

    // checking if jwt userId and current userId is same or not
    const user = sameUserValidator(request, userId, next);
    if (!user) {
      throw new Error(messages.accessDeniedMessage);
    }

    const data = await UrlModel.findOne({ shortUrl: uniqueId });
    if (!data) {
      throw new Error(messages.urlNotExistsMessage);
    }

    await data.deleteOne();

    await UserModel.updateOne({ _id: userId }, { $pull: { urls: data._id } });

    // Sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.urlDeleteSuccessMessage,
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.urlDeleteErrorMessage));
  }
};

export const getAllUrlController: RequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { userId } = request.params;

    // checking if jwt userId and current userId is same or not
    const user = sameUserValidator(request, userId, next);
    if (!user) {
      throw new Error(messages.accessDeniedMessage);
    }

    const userData = await UserModel.aggregate([
      {
        $match: { _id: user._id },
      },
      {
        $lookup: { from: 'url', as: 'urls', localField: 'urls', foreignField: '_id' },
      },
    ]);

    // Sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.urlFetchSuccessMessage,
      {
        data: userData[0]?.urls,
      },
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.urlFetchErrorMessage));
  }
};

export const getUrlStatsController: RequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { userId } = request.params;

    // checking if jwt userId and current userId is same or not
    const user = sameUserValidator(request, userId, next);
    if (!user) {
      throw new Error(messages.accessDeniedMessage);
    }

    const userData = await UserModel.aggregate([
      {
        $match: { _id: user._id },
      },
      {
        $lookup: { from: 'url', as: 'urls', localField: 'urls', foreignField: '_id' },
      },
    ]);

    const userUrls: IUrl[] = userData[0]?.urls;

    const data = {
      totalLinks: userUrls.length,
      activeLinks: userUrls?.filter(({ isActive }) => isActive)?.length || 0,
      inActiveLinks: userUrls?.filter(({ isActive }) => !isActive)?.length || 0,
      totalClicks: userUrls?.reduce((prev, { clicks }) => prev + clicks, 0) || 0,
      recentLinks: userUrls.reverse().slice(0, 5),
    };

    // Sending success response
    const responseMessage: IResponseSuccess = CreateResponse.success(
      messages.urlFetchSuccessMessage,
      {
        data,
      },
    );
    response.status(responseMessage.statusCode).json(responseMessage);
  } catch (error: any) {
    next(CreateError.clientError(error?.message || messages.urlFetchErrorMessage));
  }
};
