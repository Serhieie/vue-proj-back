import httpError from '../../helpers/httpError';
import { updatePointByFilter } from '../../services/pointsService';
import { AuthenticatedRequest } from '../../middlewares/autenticate';
import { Response } from 'express';

export const updatePoint = async (req: AuthenticatedRequest, res: Response) => {
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, 'Body must have at least one field');
  }

  const image = req.file;
  const { img, id: pointId } = req.body;
  const { _id: owner } = req.user || {};

  const newProfile = {
    ...req.body,
    img: image ? image.path : img,
  };

  const result = await updatePointByFilter({ owner, _id: pointId }, newProfile);

  if (!result) {
    throw httpError(404, `Column with id: ${pointId} not found`);
  }

  res.json({
    message: 'success',
  });
};
