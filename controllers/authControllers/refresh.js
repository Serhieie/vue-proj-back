import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { updateUser } from '../../services/authServise.js';

dotenv.config();

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, ACCESS_EXPIRES_TIME } =
  process.env;

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token is required' });
  }

  const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
  const userId = decoded.id;
  const newAccessToken = jwt.sign({ id: userId }, ACCESS_SECRET_KEY, {
    expiresIn: ACCESS_EXPIRES_TIME,
  });

  await updateUser(userId, { token: newAccessToken });

  res.status(200).json({ accessToken: newAccessToken });
};
