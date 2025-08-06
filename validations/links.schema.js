import Joi from 'joi';

const linkSchema = Joi.object({
  title: Joi.string().min(3).required(),
  url: Joi.string().uri().required(),
  tags: Joi.array().items(Joi.string()).default([]),
  note: Joi.string().allow('', null)
});

export default linkSchema;