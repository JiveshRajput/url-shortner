export interface ISignInApi {
  email: string;
  password: string;
}
export interface ISignUpApi {
  name: string;
  password: string;
}
export interface IVerifyOtpApi {
  otp: string;
}
export interface ISendOtpByMailApi {
  email: string;
}
export interface IResetPasswordApi {
  otp: string;
  password: string;
}
export interface ISignOutApi {
  refreshToken: string;
}
