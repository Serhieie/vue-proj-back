import helpers from '../../helpers/index.js';
import { updateUser } from '../../services/authServise.js';

export const updateProfile = async (req, res) => {
  const img = req.file;
  const { password } = req.body;
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
