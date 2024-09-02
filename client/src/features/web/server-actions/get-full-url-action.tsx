'use server';

import { notFound, redirect } from 'next/navigation';
import { getFullUrlApi } from '../apis';

export async function getFullUrlAction(shortUrlId: string) {
  const response = await getFullUrlApi(shortUrlId);
  const data = await response.json();
  const isActive: boolean = data?.data?.isActive;
  const fullUrl: string = data?.data?.fullUrl;

  if (fullUrl && isActive) {
    redirect(fullUrl);
  } else {
    notFound();
  }
}
