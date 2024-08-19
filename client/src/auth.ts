import NextAuth, { CredentialsSignin, DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInApi } from './features/auth/api';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      type: 'credentials',
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin({
            cause: 'Credentials missing!!!',
            // message: 'Credentials missing!!!',
          });
        }

        const result = await signInApi({ email, password });
        const data = await result.json();

        if (data?.status === 'FAIL') {
          throw new CredentialsSignin({
            cause: data?.message,
            // message: data?.message,
          });
        }

        const { _id = '', name = '', role = '' } = data?.data || {};

        return { id: _id, email, name, image: 'awer', role };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  secret: process.env.AUTH_SECRET,
});
