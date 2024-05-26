import express from 'express';
import {
  authUserLoginSchema,
  authUserRegisterSchema,
  authUserUpdateSchema,
} from '../../schemas/usersSchema.js';
import authCtrl from '../../controllers/authControllers/index.js';
import middleware from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  middleware.validateBody(authUserRegisterSchema),
  authCtrl.logout
);

authRouter.post(
  '/login',
  middleware.validateBody(authUserLoginSchema),
  authCtrl.login
);

authRouter.post('/logout', middleware.validateToken, authCtrl.logout);

authRouter.get('/refresh', middleware.validateToken, authCtrl.refresh);

authRouter.patch(
  '/update-profile',
  middleware.validateToken,
  middleware.upload.single('avatar'),
  middleware.validateBody(authUserUpdateSchema),
  authCtrl.updateProfile
);

authRouter.get('/ping', authCtrl.wakeUp);

//Google auth
authRouter.get('/google', authCtrl.googleAuth);
authRouter.get('/google-redirect', authCtrl.googleRedirect);

export default authRouter;
