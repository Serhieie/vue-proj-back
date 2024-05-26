import { createPoint } from '../../services/pointsService.js';

export const addPoint = async (req, res) => {
  const newProfile = {
    ...req.body,
  };
  await createPoint(newProfile, req.user._id);

  res.json({
    message: 'success',
  });
};
