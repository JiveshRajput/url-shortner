import { COOKIES } from '@/features/auth/constants';
import { createSession } from '@/features/auth/server-actions';
import { ACCESS_TOKEN_EXPIRY } from '@/features/common';
import { getCookies, setCookies } from '@/utils';
import { NextRequest } from 'next/server';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export async function POST(request: NextRequest) {
  const body: any = await request.json();
  console.log('save accesstoken', body);

  if (!body?.accessToken) {
    return Response.json(
      { message: 'Access token save failed', statusCode: 400, status: 'FAIL' },
      { status: 400 },
    );
  }

  createSession(body?.accessToken);
  const a = getCookies(COOKIES.ACCESS_TOKEN);
  console.log('get accessToken', a);
  return Response.json(
    {
      message: 'Access token saved successfully',
      statusCode: 200,
      status: 'OK',
      data: { accessToken: body?.accessToken },
    },
    { status: 200 },
  );
}
