import * as Joi from '@hapi/joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production'),
  APP_PORT: Joi.number().default(3000),
  REDIS_HOST: Joi.string().required().min(1),
  REDIS_PORT: Joi.number().default(6379),
  QUEUE_VIDEO: Joi.string().required().min(1),
});
