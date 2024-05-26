import jwt from 'jsonwebtoken';
import helpers from '../helpers/index.js';
import { User } from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const { SECRET_KEY } = process.env;

const autenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') next(helpers.httpError(401));
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token)
      next(helpers.httpError(401));
    req.user = user;
    next();
  } catch {
    next(helpers.httpError(401));
  }
};

export default autenticate;
