import { Schema } from 'mongoose';
import shortId from 'shortid';

// Defining a structure for the data we want to store in the database
export const urlSchema = new Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      index: true,
      default: shortId.generate,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);
