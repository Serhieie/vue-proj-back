import httpError from '../helpers/httpError';
import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';

interface Schema {
  validate: (data: any) => ValidationResult;
}

const validateBody = (schema: Schema) => {
  const func = (req: Request, _res: Response, next: NextFunction) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      console.log(validationResult.error.message);
      next(httpError(400, validationResult.error.message));
    } else {
      next();
    }
  };

  return func;
};

export default validateBody;
