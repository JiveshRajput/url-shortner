import { API_ROUTE } from '@/features/common';
import { fetch } from '@/lib/fetch';
import { IEnquiryForm } from '../types';

export const getFullUrlApi = async (id: string) => {
  return fetch.get(`${API_ROUTE.SHORT_URL.GET_CLICK_URL}/${id}`);
};

export const submitEnquiryFormApi = async (payload: IEnquiryForm) => {
  return fetch.post(API_ROUTE.COMMON.SUBMIT_INQUIRY_FORM, payload);
};
