export const parseCoordinates = (req, res, next) => {
  const coordinatesString = req.body.coordinates;

  try {
    const coordinatesArray = JSON.parse(coordinatesString);
    req.body.coordinates = coordinatesArray;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid format for coordinates' });
  }
};
