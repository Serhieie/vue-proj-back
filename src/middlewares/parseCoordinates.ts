import { Request, Response, NextFunction } from 'express';

export const parseCoordinates = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const coordinatesString = req.body.coordinates;

  try {
    const coordinatesArray = JSON.parse(coordinatesString);
    req.body.coordinates = coordinatesArray;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid format for coordinates' });
  }
};
