import { Schema } from 'mongoose';
import { DAYS, HOURS, MINUTES, SECONDS } from '../configs';

export const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: DAYS * HOURS * MINUTES * SECONDS, // The document will be automatically deleted after 30 days of its creation time
  },
});
