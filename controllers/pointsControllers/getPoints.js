import { getAllPoints } from '../../services/pointsService.js';

export const getPoints = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId } = req.params;

  const result = await getAllPoints({ owner, boardId });

  res.json(result);
};
