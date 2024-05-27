import { Schema, model } from 'mongoose';
import { themeOptions } from '../constants/userConstants.js';

export interface UserDocument extends Document {
  theme: string;
  name: string;
  password: string;
  email: string;
  googleId: string;
  token: string;
  avatarURL: string;
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    theme: {
      type: String,
      enum: themeOptions,
      default: 'dark',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    googleId: {
      type: String,
      required: [false, 'Google authorization'],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

export const User = model<UserDocument>('user', userSchema);
