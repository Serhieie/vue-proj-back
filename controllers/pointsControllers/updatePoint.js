import httpError from '../../helpers/httpError.js';
import { updatePointByFilter } from '../../services/pointsService.js';

export const updatePoint = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, 'Body must have at least one field');
  }

  const image = req.file;
  const { img, id: pointId } = req.body;
  const { _id: owner } = req.user;

  const newProfile = {
    ...req.body,
    img: image ? image.path : img,
  };

  const result = await updatePointByFilter({ owner, _id: pointId }, newProfile);

  if (!result) {
    throw httpError(404, `Column with id: ${id} not found`);
  }

  res.json({
    message: 'success',
  });
};
