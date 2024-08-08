import { RequestHandler } from 'express';
import { messages, isUrlValid } from '../helpers';
import { UrlModel } from '../models';
import { INextFunction, IRequest, IResponse } from '../types';

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

    response.status(200).json({
      message: messages.urlFetchSuccessMessage,
      data,
    });
  } catch (error: any) {
    next({
      statusCode: 401,
      message: error?.message || messages.urlFetchErrorMessage,
    });
  }
};

export const createUrlController: RequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { fullUrl } = request.body;

    if (!isUrlValid(fullUrl)) {
      throw new Error(messages.urlInvalidMessage);
    }

    const newShortenUrl = await UrlModel.create({
      fullUrl,
    });

    response.status(201).json({
      message: messages.urlCreateSuccessMessage,
      data: newShortenUrl,
    });
  } catch (error: any) {
    next({
      statusCode: 401,
      message: error?.message || messages.urlCreateErrorMessage,
    });
  }
};

export const updateUrlController: RequestHandler = async (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
): Promise<void> => {
  try {
    const { uniqueId } = request.params;
    const { fullUrl, shortUrl, clicks } = request.body;

    const data = await UrlModel.findOne({ shortUrl: uniqueId });
    if (!data) {
      throw new Error(messages.urlNotExistsMessage);
    }

    if (shortUrl) {
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

    await data.save();

    response.status(200).json({
      message: messages.urlUpdateSuccessMessage,
      data,
    });
  } catch (error: any) {
    next({
      statusCode: 400,
      message: error?.message || messages.urlUpdateErrorMessage,
    });
  }
};
