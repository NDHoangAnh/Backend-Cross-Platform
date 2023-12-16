const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    login: Boolean,
    otpRegister: Number,
    verified: Boolean,
    otpForgotPassword: Number,
    avatar: String,
    birthDate: Date,
    address: String,
    phone: String,
    role: {
      type: String,
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
