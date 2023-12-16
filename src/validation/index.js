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
    avatar: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    birthDate: Joi.date(),
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

const validateAddTarget = (data) => {
  const targetSchema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    targetPoint: Joi.number(),
  });

  return targetSchema.validate(data);
};

const validateEditTarget = (data) => {
  const targetSchema = Joi.object({
    targetId: Joi.string().required(),
    name: Joi.string(),
    description: Joi.string(),
    targetPoint: Joi.number(),
    realPoint: Joi.number(),
    status: Joi.bool(),
  });

  return targetSchema.validate(data);
};

const validateAddClass = (data) => {
  const classSchema = Joi.object({
    teacherId: Joi.string().required(),
    name: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    numOfWeek: Joi.number().required(),
  });

  return classSchema.validate(data);
};

const validateEditClass = (data) => {
  const classSchema = Joi.object({
    classId: Joi.string().required(),
    name: Joi.string(),
    startTime: Joi.date(),
    endTime: Joi.date(),
  });

  return classSchema.validate(data);
};

const validateAddActivity = (data) => {
  const activitySchema = Joi.object({
    classId: Joi.string().required(),
    type: Joi.string().required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
    time: Joi.date(),
  });

  return activitySchema.validate(data);
};

const validateEditActivity = (data) => {
  const activitySchema = Joi.object({
    activityId: Joi.string().required(),
    type: Joi.string(),
    name: Joi.string(),
    content: Joi.string(),
    time: Joi.date(),
  });

  return activitySchema.validate(data);
};

const validateAddPlan = (data) => {
  const planSchema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    isRepeatedByWeek: Joi.bool(),
  });

  return planSchema.validate(data);
};

const validateEditPlan = (data) => {
  const planSchema = Joi.object({
    planId: Joi.string().required(),
    name: Joi.string(),
    description: Joi.string(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    isRepeatedByWeek: Joi.bool(),
  });

  return planSchema.validate(data);
};

const validateEnrollClass = (data) => {
  const enrollSchema = Joi.object({
    code: Joi.string().required(),
    userId: Joi.string().required(),
  });
  return enrollSchema.validate(data);
};

const validateAdminChangePass = (data) => {
  const schemaData = Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schemaData.validate(data);
};

const validateAdminChangeRole = (data) => {
  const schemaData = Joi.object({
    userId: Joi.string().required(),
    role: Joi.string().required(),
  });

  return schemaData.validate(data);
};

const validateAddPost = (data) => {
  const postSchema = Joi.object({
    senderId: Joi.string().required(),
    content: Joi.string().required(),
    imageUrl: Joi.string(),
  });

  return postSchema.validate(data);
};

module.exports = {
  validateCreateUser,
  validateLogin,
  validateEditUser,
  validateEditPass,
  validateAddTarget,
  validateEditTarget,
  validateAddClass,
  validateEditClass,
  validateAddActivity,
  validateEditActivity,
  validateAddPlan,
  validateEditPlan,
  validateEnrollClass,
  validateAdminChangePass,
  validateAdminChangeRole,
  validateAddPost,
};
