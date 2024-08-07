import mongoose from 'mongoose';
import { urlSchema } from '../schemas';

const UrlModel = mongoose.model('url', urlSchema, 'url');

export default UrlModel;
