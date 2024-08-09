import { model } from 'mongoose';
import { urlSchema } from '../schemas';

export const UrlModel = model('url', urlSchema, 'url');
