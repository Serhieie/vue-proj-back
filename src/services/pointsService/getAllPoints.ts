import { PointDocument, Point } from '../../models/point';

export const getAllPoints = async (filter = {}): Promise<PointDocument[]> =>
  await Point.find(filter, '-createdAt -updatedAt').populate('owner', '_id');
