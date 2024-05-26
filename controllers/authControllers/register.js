import 'dotenv/config';
import jwt from 'jsonwebtoken';
import helpers from '../../helpers/index.js';
import {
  createUser,
  findUser,
  updateUser,
} from '../../services/authServise.js';

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_TIME = process.env.EXPIRES_TIME;

export const register = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await findUser(email);
  if (user && !user.googleId) {
    throw helpers.httpError(409, 'Email in use');
  } else if (user && user.googleId) {
    if (user.avatarURL) req.body.avatarURL = user.avatarURL;
    else req.body.avatarURL = '';

    const hashPwd = await helpers.createHash(password);
    const updatedUser = await updateUser(user._id, {
      name: user.name,
      email: user.email,
      theme: user.theme,
      googleId: user.googleId,
      theme: 'dark',
      password: hashPwd,
    });

    const token = jwt.sign(updatedUser._id, SECRET_KEY, {
      expiresIn: EXPIRES_TIME,
    });
    const response = await updateUser(updatedUser._id, { token });
    res.status(201).json({
      token,
      user: response,
    });
  }

  req.body.avatarURL = '';
  const hashPwd = await helpers.createHash(password);
  const id = await createUser({
    ...req.body,
    password: hashPwd,
  });
  const token = jwt.sign({ id }, SECRET_KEY, {
    expiresIn: EXPIRES_TIME,
  });
  const response = await updateUser(id, { token });
  res.status(201).json({
    token,
    user: response,
  });
};
