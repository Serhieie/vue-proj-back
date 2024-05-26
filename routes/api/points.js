import express from 'express';
import pointsCtrl from '../../controllers/pointsControllers/index.js';
import middleware from '../../middlewares/index.js';
import {
  createPointSchema,
  updatePointSchema,
} from '../../schemas/pointsSchemas.js';

const pointsRouter = express.Router();

pointsRouter.use(middleware.autenticate);

pointsRouter.get('/', pointsCtrl.getPoints);

pointsRouter.post(
  '/post',
  middleware.upload.single('img'),
  middleware.parseCoordinates,
  middleware.validateBody(createPointSchema),
  pointsCtrl.addPoint
);

pointsRouter.patch(
  '/patch',
  middleware.upload.single('img'),
  middleware.parseCoordinates,
  middleware.validateBody(updatePointSchema),
  pointsCtrl.updatePoint
);

pointsRouter.delete(
  '/delete/:pointId',
  middleware.isValidId,
  pointsCtrl.deletePoint
);

export default pointsRouter;
