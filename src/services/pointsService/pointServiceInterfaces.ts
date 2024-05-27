import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserDocument } from '../../models/user';

export interface ServiceUpdatePointByFilter {
  owner: Schema.Types.ObjectId | undefined;
  _id: ObjectId | undefined;
}

export interface ServiceRemovePointFilter {
  owner: Schema.Types.ObjectId | undefined;
  _id: string;
}

export interface CreatePointFilter {
  body: UserDocument;
  userId: Schema.Types.ObjectId | undefined;
}
