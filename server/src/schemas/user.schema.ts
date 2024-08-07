import mongoose from 'mongoose';

// Defining a structure for the data we want to store in the database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password required'],
    },
    email: {
      type: String,
    },
    number: {
      type: Number,
      required: [true, 'Number required'],
      unique: [true, 'Number should be unique'],
    },
  },
  { timestamps: true },
);

export default userSchema;
