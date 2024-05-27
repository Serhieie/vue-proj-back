import { Point } from '../../models/point';
import { UserDocument } from '../../models/user';
import { ServiceUpdatePointByFilter } from './pointServiceInterfaces';

export const updatePointByFilter = (
  filter: ServiceUpdatePointByFilter,
  data: UserDocument
) => Point.findOneAndUpdate(filter, data);
