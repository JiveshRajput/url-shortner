import mongoose from 'mongoose';
import shortId from 'shortid';

// Defining a structure for the data we want to store in the database
const urlSchema = new mongoose.Schema(
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

export default urlSchema;
