import helpers from '../../helpers/index';
import { register } from './register';
import { me } from './me';
import { logout } from './logout';
import { googleAuth, googleRedirect } from './googleAuth';
import { login } from './login';
import { updateProfile } from './updateProfile';
import { wakeUp } from './ping';
import { refresh } from './refresh';

export default {
  register: helpers.ctrlWrapper(register),
  login: helpers.ctrlWrapper(login),
  me: helpers.ctrlWrapper(me),
  logout: helpers.ctrlWrapper(logout),
  googleAuth: helpers.ctrlWrapper(googleAuth),
  googleRedirect: helpers.ctrlWrapper(googleRedirect),
  updateProfile: helpers.ctrlWrapper(updateProfile),
  wakeUp: helpers.ctrlWrapper(wakeUp),
  refresh: helpers.ctrlWrapper(refresh),
};
