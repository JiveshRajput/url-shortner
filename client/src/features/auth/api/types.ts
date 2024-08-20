export interface ISignInApi {
  email: string;
  password: string;
}
export interface ISignUpApi {
  name: string;
  email: string;
  password: string;
}
export interface ISignOutApi {
  refreshToken: string;
}
