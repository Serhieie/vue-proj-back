import helpers from '../../helpers/index.js';
import { register } from './register.js';
import { me } from './me.js';
import { logout } from './logout.js';
import { googleAuth, googleRedirect } from './googleAuth.js';
import { login } from './login.js';
import { updateProfile } from './updateProfile.js';
import { wakeUp } from './ping.js';
import { refresh } from './refresh.js';

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
