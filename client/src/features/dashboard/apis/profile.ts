import { API_ROUTE, IUser } from '@/features/common';
import { fetch } from '@/lib/fetch';

export const updateProfileApi = async (userId: string, payload: Partial<IUser>) => {
  return fetch.patch(API_ROUTE.PROFILE.UPDATE(userId), payload);
};
