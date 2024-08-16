'use server';

import { notFound, redirect } from 'next/navigation';

export async function getFullUrlAction(shortUrlId: string) {
  console.log('short url id:', shortUrlId);

  if (shortUrlId === 'not-found') {
    notFound();
  }

  redirect('/');
}
