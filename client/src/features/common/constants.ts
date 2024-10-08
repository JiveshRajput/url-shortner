export const WEBSITE_NAME: string = 'QuickURL';
export const BACKEND_API_URL: string = 'http://13.60.240.102:5050/app/v1';
// export const BACKEND_API_URL: string = 'http://127.0.0.1:5050/app/v1';
export const WEBSITE_URL: string = 'http://quik-url.vercel.app';
export const SECOND: number = 1000;
export const MINUTE: number = 60 * SECOND;
export const HOUR: number = 60 * MINUTE;
export const DAY: number = 24 * HOUR;

export const ACCESS_TOKEN_EXPIRY: number = DAY;
export const REFRESH_TOKEN_EXPIRY: number = 7 * DAY;

export const API_ROUTE = {
  AUTH: {
    SIGN_IN: `/auth/login`,
    SIGN_UP: `/auth/register`,
    SEND_OTP: `/auth/send-otp`,
    VERIFY_OTP: `/auth/verify-otp`,
    SEND_OTP_BY_MAIL: `/auth/send-otp-by-email`,
    RESET_PASSWORD: `/auth/reset-password-by-otp`,
    SIGN_OUT: `/auth/logout`,
    AUTHENTICATE: `/auth/authenticate`,
    GET_ACCESS_TOKEN: `/auth/get-access-token`,
  },
  PROFILE: {
    UPDATE: (userId: string) => `/auth/${userId}`,
    UPDATE_PIC: (userId: string) => `/auth/${userId}/upload-pic`,
  },
  COMMON: {
    GET_USER_BY_ID: `/auth`,
    SUBMIT_INQUIRY_FORM: `/enquiry`
  },
  SHORT_URL: {
    URL: '/url',
    GET_URL: '/url',
    GET_CLICK_URL: '/url/click',
    GET_ALL_URL: '/url/all',
    GET_URL_STATS: '/url/stats',
    UPDATE_URL: '/url',
    DELETE_URL: '/url',
    CREATE_URL: '/url',
  },
};

export const CACHING_TAGS = {
  URL: 'url',
  USER: 'user',
  USER_ALL_URL: 'user-all-url',
  URL_STATS: 'url-stats',
  DASHBOARD: '/dashboard',
};
