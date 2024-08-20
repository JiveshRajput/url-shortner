export const WEBSITE_NAME: string = 'QuickURL';
export const BACKEND_API_URL: string = 'http://127.0.0.1:5050/app/v1';
export const SECOND: number = 1000;
export const MINUTE: number = 60 * SECOND;
export const HOUR: number = 60 * MINUTE;
export const DAY: number = 24 * HOUR;

export const ACCESS_TOKEN_EXPIRY: number = DAY;
export const REFRESH_TOKEN_EXPIRY: number = 7 * DAY;

export const API_ROUTE = {
  AUTH: {
    SIGN_IN: `/auth/login`,
    SIGN_UP: `/auth/logout`,
    SIGN_OUT: ``,
  },
};
