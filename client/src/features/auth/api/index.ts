import { API_ROUTE } from '@/features/common';
import { fetch } from '@/lib/fetch';
import { ISignInApi, ISignOutApi, ISignUpApi } from './types';

export const signInApi = async (credentials: ISignInApi) => {
  return fetch.post(API_ROUTE.AUTH.SIGN_IN, credentials);
};

export const signUpApi = async (credentials: ISignUpApi) => {
  return fetch.post(API_ROUTE.AUTH.SIGN_UP, credentials);
};

export const signOutApi = async (credentials: ISignOutApi) => {
  return fetch.post(API_ROUTE.AUTH.SIGN_OUT, credentials);
};
