import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { updateUser } from '../../services/authService';
import { Response, Request } from 'express';

dotenv.config();

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, ACCESS_EXPIRES_TIME } =
  process.env;

if (!ACCESS_SECRET_KEY || !REFRESH_SECRET_KEY || !ACCESS_EXPIRES_TIME) {
  throw new Error("SECRET_KEY's are missing");
}

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token is required' });
  }

  let decoded: string | JwtPayload;
  try {
    decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  if (typeof decoded === 'string') {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const userId = (decoded as JwtPayload).id;

  const newAccessToken = jwt.sign({ id: userId }, ACCESS_SECRET_KEY, {
    expiresIn: ACCESS_EXPIRES_TIME,
  });

  await updateUser(userId, { token: newAccessToken });

  res.status(200).json({ accessToken: newAccessToken });
};
