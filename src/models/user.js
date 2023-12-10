const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  login: Boolean,
  otpRegister: Number,
  verified: Boolean,
  otpForgotPassword: Number,
  role: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
