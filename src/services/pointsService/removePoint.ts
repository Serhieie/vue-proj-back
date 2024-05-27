import { Point } from '../../models/point';
import { ServiceRemovePointFilter } from './pointServiceInterfaces';

export const removePoint = (filter: ServiceRemovePointFilter) =>
  Point.findOneAndDelete(filter);
