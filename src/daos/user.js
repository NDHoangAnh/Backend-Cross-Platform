const User = require("../models/user");

const findUser = async (condition) => {
  const user = await User.findOne(condition);
  return user;
};

const updateUser = async (condition, data) => {
  const user = await User.findOneAndUpdate(condition, data, { new: true });
  return user;
};

const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};

const addUser = async ({ email, username, hashPassword, otp }) => {
  const user = await User.create({
    email,
    username,
    password: hashPassword,
    otpRegister: otp,
  });
  return user;
};

module.exports = { findUser, updateUser, deleteUser, addUser };
