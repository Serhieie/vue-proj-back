import { createPoint } from '../../services/pointsService.js';

export const addPoint = async (req, res) => {
  const image = req.file;

  const newProfile = {
    ...req.body,
    img: image ? image.path : img,
  };
  const point = await createPoint(newProfile, req.user._id);

  res.json({
    message: 'success',
  });
};
