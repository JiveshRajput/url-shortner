'use server';

import { redirect } from 'next/navigation';

export async function getFullUrlAction(shortUrlId: string) {
  console.log('short url id:', shortUrlId);
  redirect('/');
}
