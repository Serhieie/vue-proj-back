import { User } from '../../models/user';
import { UserDocument } from '../../models/user';

export const createUser = async (body: Partial<UserDocument>) => {
  const res = await User.create(body);
  return res._id;
};
