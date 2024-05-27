import { createPoint } from '../../services/pointsService';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/autenticate';

export const addPoint = async (req: AuthenticatedRequest, res: Response) => {
  const newProfile = {
    ...req.body,
  };
  await createPoint({ body: newProfile, userId: req.user?._id });

  res.json({
    message: 'success',
  });
};
