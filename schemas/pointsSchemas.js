import Joi from 'joi';

export const createPointSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  coordinates: Joi.array()
    .items(Joi.number().required(), Joi.number().required())
    .length(2)
    .required(),
});

export const updatePointSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  coordinates: Joi.array().items(Joi.number(), Joi.number()).length(2),
});
