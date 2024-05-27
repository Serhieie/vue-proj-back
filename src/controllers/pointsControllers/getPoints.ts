import { getAllPoints } from '../../services/pointsService';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/autenticate';

export const getPoints = async (req: AuthenticatedRequest, res: Response) => {
  const { _id: owner } = req.user || {};
  const result = await getAllPoints({ owner });
  res.json(result);
};
