import httpError from '../../helpers/httpError';
import { removePoint } from '../../services/pointsService';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/autenticate';

export const deletePoint = async (req: AuthenticatedRequest, res: Response) => {
  const { _id: owner } = req.user || {};
  const { pointId } = req.params;
  console.log(pointId);
  const result = await removePoint({ owner, _id: pointId });

  if (!result) {
    throw httpError(404, `Point with id: ${pointId} not found`);
  }

  res.json({
    message: 'Success delete operation',
  });
};
