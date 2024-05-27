import { NextFunction } from 'express';
import mongoose, { Error as MongooseError } from 'mongoose';

interface CustomError extends MongooseError {
  code?: number | string;
  status?: number | string;
}

export const handleSaveError = (
  error: CustomError,
  data: any,
  next: NextFunction
): void => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export const setUpdateSetting = function (this: any, next: NextFunction): void {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

export const deleteAllColumns = async function (
  this: any,
  next: NextFunction
): Promise<void> {
  try {
    await mongoose.model('column').deleteMany({ boardId: this._id });
    next();
  } catch (error) {
    next(error);
  }
};

export const deleteAllCards = async function (
  this: any,
  next: NextFunction
): Promise<void> {
  try {
    await mongoose.model('card').deleteMany({ columnId: this._id });
    next();
  } catch (error) {
    next(error);
  }
};
