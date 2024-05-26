import 'dotenv/config';
import jwt from 'jsonwebtoken';
import helpers from '../../helpers/index.js';
import { findUser, updateUser } from '../../services/authServise.js';

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_TIME = process.env.EXPIRES_TIME;

export const login = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await findUser(email);

  if (!user) {
    throw helpers.httpError(401, 'Email or password is wrong');
  }

  const isValidPwd = await helpers.compareHash(password, user.password);

  if (!isValidPwd) {
    throw helpers.httpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: EXPIRES_TIME,
  });

  const response = await updateUser(user._id, { token });

  res.json({ token, user: response });
};
