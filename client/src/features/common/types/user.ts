export interface IUser {
  _id: string;
  email: string;
  name: string;
  isValidated: boolean;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
