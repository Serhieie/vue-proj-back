import httpError from "../../helpers/httpError.js";
import { removedPoint } from "../../services/pointsService.js";

export const deletePoint = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await removedPoint({ owner, _id: id });

  if (!result) {
    throw httpError(404, `Point with id: ${id} not found`);
  }

  res.json(id);
};
