import { Schema } from 'mongoose';

// Defining a structure for the data we want to store in the database
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: [true, 'Email should be unique'],
    },
    number: {
      type: Number,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    isValidated: {
      type: Boolean,
      default: false,
      required: [true, 'isValidated required'],
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password required'],
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER', 'VISITOR'],
      required: [true, 'Role required'],
      default: 'USER',
    },
  },
  { timestamps: true },
);

export default userSchema;
