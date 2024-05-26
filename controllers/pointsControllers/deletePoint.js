import httpError from '../../helpers/httpError.js';
import { removedPoint } from '../../services/pointsService.js';

export const deletePoint = async (req, res) => {
  const { _id: owner } = req.user;
  const { pointId } = req.params;
  console.log(pointId);
  const result = await removedPoint({ owner, _id: pointId });

  if (!result) {
    throw httpError(404, `Point with id: ${pointId} not found`);
  }

  res.json({
    message: 'Success delete operation',
  });
};
