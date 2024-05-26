import Point from '../models/point.js';

export const getAllPoints = (filter = {}) =>
  Point.find(filter, '-createdAt -updatedAt').populate('owner', '_id');

export const updatePointByFilter = (filter, data) =>
  Point.findOneAndUpdate(filter, data);

export const removedPoint = (filter) => Point.findOneAndDelete(filter);

export const createPoint = async (req) =>
  Point.create({ ...req.body, owner: req.user._id });
