import { createPoint } from "../../services/pointsService.js";

export const addPoint =  async (req, res) => {
  const point =  await createPoint(req);

  res.json(point);
};
