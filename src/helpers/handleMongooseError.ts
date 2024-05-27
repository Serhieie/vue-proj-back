import { ErrorRequestHandler, NextFunction } from 'express';
import { CustomError } from '../app';

const handleMongooseError: ErrorRequestHandler = (
  error: CustomError,
  _req,
  _res,
  next: NextFunction
) => {
  const { name, code } = error;
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};

export default handleMongooseError;
