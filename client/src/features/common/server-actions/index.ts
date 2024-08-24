'use server';

import { redirect, RedirectType } from 'next/navigation';

export async function navigate(path: string, type: RedirectType = RedirectType.replace) {
  return redirect(path, type);
}
