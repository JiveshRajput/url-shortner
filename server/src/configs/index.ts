import { PortType } from '../types';
export * from './mongo-db-setup';
export * from './initial-app-setup';

export const BCRYPT_SALT: number = 10;
export const PORT: PortType = 8080;
export const EXPIRES_IN_JWT: string = '1h';
export const EXPIRES_IN_ACCESS_TOKEN: string = '1d';
export const EXPIRES_IN_REFRESH_TOKEN: string = '30d';
export const PROJECT_NAME: string = 'URL Shortner';
export const ADMIN_EMAIL: string = 'jsoperatorz@gmail.com';
export const OTP_EXPIRY_MINUTES: number = 5;
export const SECONDS: number = 60;
export const MINUTES: number = 60;
export const HOURS: number = 24;
export const DAYS: number = 30;
export const MONTH: number = DAYS * HOURS * MINUTES * SECONDS;
export const MONTHS: number = 12;
