import { IUser } from '../types';

export interface IResponseFormat {
  message: string;
  statusCode: number;
  status: string;
}
export interface IUserDetailsApi extends IResponseFormat {
  data: IUser;
}
