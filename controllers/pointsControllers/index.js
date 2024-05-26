import helpers from '../../helpers/index.js';
import { addPoint } from './addPoint.js';
import { getPoints } from './getPoints.js';
import { updatePoint } from './updatePoint.js';
import { deletePoint } from './deletePoint.js';

export default {
  addPoint: helpers.ctrlWrapper(addPoint),
  getPoints: helpers.ctrlWrapper(getPoints),
  updatePoint: helpers.ctrlWrapper(updatePoint),
  deletePoint: helpers.ctrlWrapper(deletePoint),
};
