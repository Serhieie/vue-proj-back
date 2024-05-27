import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middlewares/autenticate';

export const me = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new Error('User is not exist');
  }
  const { email, theme, avatarURL, name, _id } = req.user;
  res.json({ _id, name, email, avatarURL, theme });
};
