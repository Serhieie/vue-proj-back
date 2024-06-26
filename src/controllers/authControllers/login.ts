import 'dotenv/config';
import jwt from 'jsonwebtoken';
import helpers from '../../helpers/index.js';
import { findUser, updateUser } from '../../services/authService';
import { Response, Request } from 'express';

const {
  ACCESS_SECRET_KEY,
  REFRESH_EXPIRES_TIME,
  REFRESH_SECRET_KEY,
  ACCESS_EXPIRES_TIME,
} = process.env;

if (
  !ACCESS_SECRET_KEY ||
  !REFRESH_EXPIRES_TIME ||
  !REFRESH_SECRET_KEY ||
  !ACCESS_EXPIRES_TIME
) {
  throw new Error('Missing SECRETS cant to create Access or Refresh tokens');
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const [user] = await findUser(email);
  if (!user) {
    throw helpers.httpError(401, 'Email or password is wrong');
  }

  const isValidPwd = await helpers.compareHash(password, user.password);

  if (!isValidPwd) {
    throw helpers.httpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, ACCESS_SECRET_KEY, {
    expiresIn: ACCESS_EXPIRES_TIME,
  });

  const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET_KEY, {
    expiresIn: REFRESH_EXPIRES_TIME,
  });

  const response = await updateUser(user._id, { token });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: false,
  });
  res.json({ token, user: response });
};
