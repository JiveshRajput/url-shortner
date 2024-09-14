'use server';

import { IStatus } from '@/types';
import { submitEnquiryFormApi } from '../apis';
import { IEnquiryForm } from '../types';
import { revalidatePath } from 'next/cache';

export async function submitEnquiryFormAction(formData: FormData) {
  try {
    const payload: IEnquiryForm = {
      name: formData.get('name') as string,
      number: formData.get('number') as string | number,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const response: Response = await submitEnquiryFormApi(payload);
    const data = await response.json();

    revalidatePath('/');

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }

    return {
      successMessage: data?.message,
      data: data.data,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}
