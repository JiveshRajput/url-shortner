import type { Express, Request, Response, NextFunction, RequestHandler } from 'express';
export type * from './schema';

export type IExpress = Express;
export type IRequest = Request;
export type IRequestHandler = RequestHandler;
export type IResponse = Response;
export type INextFunction = NextFunction;
export type PortType = string | number;
export type VoidFunction = () => void;

export type IError = Error & IResponseError;

export interface IResponseError {
  message: string;
  status: string;
  statusCode: number;
}

export interface IResponseSuccess {
  message: string;
  status: string;
  statusCode: number;
  data?: object;
}

export enum IStatusType {
  OK = 'OK',
  FAIL = 'FAIL',
}

export enum IUserRole {
  VISITOR = 'VISITOR',
  USER = 'USER',
  ADMIN = 'ADMIN',
}
