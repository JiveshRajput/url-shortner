import { API_ROUTE } from '@/features/common';
import { fetch } from '@/lib/fetch';
import {
  IResetPasswordApi,
  ISendOtpByMailApi,
  ISignInApi,
  ISignOutApi,
  ISignUpApi,
  IVerifyOtpApi,
} from './types';

export const signInApi = async (credentials: ISignInApi) => {
  return fetch.post(API_ROUTE.AUTH.SIGN_IN, credentials);
};

export const signUpApi = async (credentials: ISignUpApi) => {
  return fetch.post(API_ROUTE.AUTH.SIGN_UP, credentials);
};

export const sendOtpApi = async () => {
  return fetch.post(API_ROUTE.AUTH.SEND_OTP);
};

export const verifyOtpApi = async (data: IVerifyOtpApi) => {
  return fetch.post(API_ROUTE.AUTH.VERIFY_OTP, data);
};

export const sendOtpByMailApi = async (data: ISendOtpByMailApi) => {
  return fetch.post(API_ROUTE.AUTH.SEND_OTP_BY_MAIL, data);
};

export const resetPasswordApi = async (data: IResetPasswordApi) => {
  return fetch.post(API_ROUTE.AUTH.RESET_PASSWORD, data);
};

export const signOutApi = async (credentials: ISignOutApi) => {
  return fetch.post(API_ROUTE.AUTH.SIGN_OUT, credentials);
};
