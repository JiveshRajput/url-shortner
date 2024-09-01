import { IUser } from '../types';

export interface IUserDetailsApi {
  message: string;
  statusCode: number;
  status: string;
  data: IUser;
}
