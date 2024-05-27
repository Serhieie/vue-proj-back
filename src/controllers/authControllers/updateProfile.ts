import helpers from '../../helpers';
import { updateUser } from '../../services/authService';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/autenticate';

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const img = req.file;
  const { password } = req.body;

  if (!req.user) {
    throw new Error('User is not exist');
  }
  const { theme, name, email, _id, avatarURL } = req.user;
  let newPass;
  if (password) {
    newPass = req.body.password;
    req.body.password = await helpers.createHash(newPass);
  }

  const newProfile = {
    theme,
    name,
    email,
    ...req.body,
    avatarURL: img ? img.path : avatarURL,
  };
  const response = await updateUser(_id, newProfile);

  res.json(response);
};
