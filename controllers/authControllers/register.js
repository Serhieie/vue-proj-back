import 'dotenv/config';
import jwt from 'jsonwebtoken';
import helpers from '../../helpers/index.js';
import {
  createUser,
  findUser,
  updateUser,
} from '../../services/authServise.js';

const {
  ACCESS_SECRET_KEY,
  REFRESH_EXPIRES_TIME,
  REFRESH_SECRET_KEY,
  ACCESS_EXPIRIES_TIME,
} = process.env;

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

    const token = jwt.sign(updatedUser._id, ACCESS_SECRET_KEY, {
      expiresIn: ACCESS_EXPIRIES_TIME,
    });

    const response = await updateUser(updatedUser._id, { token });

    const refreshToken = jwt.sign({ id: updatedUser._id }, REFRESH_SECRET_KEY, {
      expiresIn: REFRESH_EXPIRES_TIME,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
    });
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
  const token = jwt.sign({ id }, ACCESS_SECRET_KEY, {
    expiresIn: ACCESS_EXPIRIES_TIME,
  });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET_KEY, {
    expiresIn: REFRESH_EXPIRES_TIME,
  });
  const response = await updateUser(id, { token });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(201).json({
    token,
    user: response,
  });
};
