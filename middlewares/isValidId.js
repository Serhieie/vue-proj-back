import { isValidObjectId } from 'mongoose';
import helpers from '../helpers/index.js';

const isValidId = (req, res, next) => {
  const { pointId, id } = req.params;
  let idToCheck;
  if (pointId) {
    idToCheck = pointId;
  } else if (id) {
    idToCheck = id;
  } else {
    return next(helpers.httpError(400, 'No id provided'));
  }

  if (!isValidObjectId(idToCheck)) {
    return next(helpers.httpError(400, `${idToCheck} is not a valid id`));
  }

  next();
};

export default isValidId;
