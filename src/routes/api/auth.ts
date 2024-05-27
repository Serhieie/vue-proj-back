import express from 'express';
import {
  authUserLoginSchema,
  authUserRegisterSchema,
  authUserUpdateSchema,
} from '../../schemas/usersSchema';
import authCtrl from '../../controllers/authControllers';
import middleware from '../../middlewares';

const authRouter = express.Router();

authRouter.post(
  '/register',
  middleware.validateBody(authUserRegisterSchema),
  authCtrl.register
);

authRouter.post(
  '/login',
  middleware.validateBody(authUserLoginSchema),
  authCtrl.login
);

authRouter.get('/logout', middleware.autenticate, authCtrl.logout);

authRouter.get('/me', middleware.autenticate, authCtrl.me);

authRouter.get('/refresh', authCtrl.refresh);

authRouter.patch(
  '/update-profile',
  middleware.autenticate,
  middleware.upload.single('avatar'),
  middleware.validateBody(authUserUpdateSchema),
  authCtrl.updateProfile
);

authRouter.get('/ping', authCtrl.wakeUp);

//Google auth
authRouter.get('/google', authCtrl.googleAuth);
authRouter.get('/google-redirect', authCtrl.googleRedirect);

export default authRouter;
