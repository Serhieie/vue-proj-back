import { User } from '../../models/user';
import { UserDocument } from '../../models/user';
import { Schema } from 'mongoose';

export const updateUser = async (
  userId: Schema.Types.ObjectId,
  updateData: Partial<UserDocument>
) => {
  return User.findByIdAndUpdate(userId, updateData, {
    returnDocument: 'after',
  }).select('email name  theme avatarURL -_id');
};
