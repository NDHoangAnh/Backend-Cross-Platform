const Joi = require("joi");
const configs = require("../configs/index");

const validateCreateUser = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return userSchema.validate(data);
};

const validateLogin = (data) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return loginSchema.validate(data);
};

const validateEditUser = (data) => {
  const editUserSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email().required().invalid(configs.EMAIL_ADMIN),
    password: Joi.any().forbidden(),
    login: Joi.any().forbidden(),
    otpRegister: Joi.any().forbidden(),
    verified: Joi.any().forbidden(),
    otpForgotPassword: Joi.any().forbidden(),
  });

  return editUserSchema.validate(data);
};

const validateEditPass = (data) => {
  const editPassSchema = Joi.object({
    email: Joi.string().email().required(),
    oldPass: Joi.string().required(),
    newPass: Joi.string().required(),
    confirmPass: Joi.string().required(),
  });

  return editPassSchema.validate(data);
};

const validateAddTimeline = (data) => {
  const timelineSchema = Joi.object({
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    label: Joi.string().required(),
  });

  return timelineSchema.validate(data);
};

module.exports = {
  validateCreateUser,
  validateLogin,
  validateEditUser,
  validateEditPass,
  validateAddTimeline,
};
