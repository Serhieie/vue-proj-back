import { Point } from '../../models/point';
import { CreatePointFilter } from './pointServiceInterfaces';

export const createPoint = async ({ body, userId }: CreatePointFilter) =>
  Point.create({ ...body, owner: userId });
