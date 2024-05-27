import { User } from '../../models/user';

export const findUser = async (userEmail: string) => {
  return User.find({ email: userEmail });
};
