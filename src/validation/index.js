const Joi = require("joi");

const validateCreateUser = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return userSchema.validate(data);
};

const validateLogin = (data) => {
  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return loginSchema.validate(data);
};

module.exports = {
  validateCreateUser,
  validateLogin,
};
