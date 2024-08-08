import mongoDbSetup from './mongo-db-setup';
import initialAppSetup from './initial-app-setup';
import { PortType } from '../types';

export const BCRYPT_SALT: number = 10;
export const PORT: PortType = 8080;
export const EXPIRES_IN_JWT: string = '1h';
export const PROJEC_NAME: string = 'URL Shortner';

export { initialAppSetup, mongoDbSetup };
