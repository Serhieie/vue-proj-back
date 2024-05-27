import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import helpers from '../helpers/index.js';
import { User, UserDocument } from '../models/user';
import dotenv from 'dotenv';
dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

const { ACCESS_SECRET_KEY } = process.env;

if (!ACCESS_SECRET_KEY) {
  throw new Error('Missing ACCESS_SECRET_KEY environment variable');
}

const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') next(helpers.httpError(401));
  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY) as { id: string };
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      return next(helpers.httpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(helpers.httpError(401));
  }
};

export default authenticate;
