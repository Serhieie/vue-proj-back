import helpers from '../../helpers/index.js';
import { register } from './register.js';
import { refresh } from './refresh.js';
import { logout } from './logout.js';
import { googleAuth, googleRedirect } from './googleAuth.js';
import { login } from './login.js';
import { updateProfile } from './updateProfile.js';
import { wakeUp } from './ping.js';

export default {
  register: helpers.ctrlWrapper(register),
  login: helpers.ctrlWrapper(login),
  refresh: helpers.ctrlWrapper(refresh),
  logout: helpers.ctrlWrapper(logout),
  googleAuth: helpers.ctrlWrapper(googleAuth),
  googleRedirect: helpers.ctrlWrapper(googleRedirect),
  updateProfile: helpers.ctrlWrapper(updateProfile),
  wakeUp: helpers.ctrlWrapper(wakeUp),
};
