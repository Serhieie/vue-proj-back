import { updateUser } from '../../services/authServise.js';

export const logout = async (req, res) => {
  const { _id: id } = req.user;

  await updateUser(id, { token: null });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(204).json();
};
