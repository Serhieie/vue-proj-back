import helpers from '../helpers/index.js';

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error.message);
      next(helpers.httpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
