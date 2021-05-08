import * as Joi from '@hapi/joi';

const requiredString = Joi.string().required().min(1);

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production'),
  APP_PORT: Joi.number().default(3000),
  DB_HOST: requiredString,
  DB_PORT: Joi.number().default(5432),
  DB_USER: requiredString,
  DB_PSWD: requiredString,
  DB_NAME: requiredString,
  REDIS_HOST: requiredString,
  REDIS_PORT: Joi.number().default(6379),
  QUEUE_PREFIX: Joi.string().min(1).default('bull'),
  QUEUE_VIDEO: requiredString,
  QUEUED_STATUS_CODE: requiredString,
  FIRST_STATUS: requiredString,
});
