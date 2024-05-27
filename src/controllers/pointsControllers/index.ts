import helpers from '../../helpers';
import { addPoint } from './addPoint';
import { getPoints } from './getPoints';
import { updatePoint } from './updatePoint';
import { deletePoint } from './deletePoint';

export default {
  addPoint: helpers.ctrlWrapper(addPoint),
  getPoints: helpers.ctrlWrapper(getPoints),
  updatePoint: helpers.ctrlWrapper(updatePoint),
  deletePoint: helpers.ctrlWrapper(deletePoint),
};
