import { User } from '../../models/user';

export const findUserById = async (id: string) => {
  return User.findById(id);
};
