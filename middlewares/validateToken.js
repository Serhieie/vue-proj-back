import jwt from 'jsonwebtoken';
import 'dotenv/config';
import helpers from '../helpers/index.js';
import { findUserById } from '../services/authServise.js';

const SECRET_KEY = process.env.SECRET_KEY;

export const validateToken = async (req, res, next) => {
  const authString = req.headers.authorization;
  if (!authString) {
    return next(helpers.httpError(401, 'Authorization headre not found'));
  }
  try {
    const [Bearer, token] = authString.split(' ');
    if (Bearer !== 'Bearer') {
      return next(helpers.httpError(401, 'Not authorized'));
    }
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await findUserById(id);

    if (id !== user.id || token !== user.token) {
      return next(helpers.httpError(401, 'Not authorized'));
    }
    req.user = user;
  } catch (error) {
    next(helpers.httpError(401, 'Not authorized'));
  }
  next();
};
