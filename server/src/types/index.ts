import type { Express, Request, Response, NextFunction } from 'express';

type IExpress = Express;
type IRequest = Request;
type IResponse = Response;
type INextFunction = NextFunction;
type PortType = string | number;
type VoidFunction = () => void;
type ControllerType = (request: IRequest, response: IResponse) => Promise<void>;
type ControllerMiddlewareType = (
  request: IRequest,
  response: IResponse,
  next: INextFunction,
) => Promise<void>;

type IError = Error & IResponseError;

interface IResponseError {
  message: string;
  status: string;
  statusCode: number;
}

interface IResponseSuccess {
  message: string;
  status: string;
  statusCode: number;
  data?: object;
}

enum IStatusType {
  OK = 'OK',
  FAIL = 'FAIL',
}

export {
  IExpress,
  IRequest,
  IResponse,
  INextFunction,
  PortType,
  VoidFunction,
  ControllerType,
  ControllerMiddlewareType,
  IError,
  IResponseError,
  IResponseSuccess,
  IStatusType,
};
