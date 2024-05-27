import { updateUser } from '../../services/authService';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/autenticate';

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    throw new Error('User is not exist');
  }
  const { _id: id } = req.user;

  await updateUser(id, { token: '' });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: false,
  });
  res.status(204).json();
};
