const bcrypt = require("bcrypt");
const userDaos = require("../daos/user");
const genOTP = require("../utils/genOTP");
const sendMail = require("../utils/sendEmail");

const registerService = async ({ email, password, username }) => {
  const checkUser = await userDaos.findUser({ email });
  if (checkUser) {
    return {
      errMsg: "User existed",
    };
  }
  const otp = genOTP();
  await sendMail(email, "OTP for your account", otp);

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await userDaos.addUser({ email, username, hashPassword, otp });
  return user;
};

const verifyOTPService = async (email, otp) => {
  const checkUser = await userDaos.findUser({ email });
  if (!checkUser || checkUser.verified === true) {
    return {
      errMsg: "Email not found or have been verified",
    };
  }

  if (checkUser.otpRegister === otp) {
    await userDaos.updateUser({ email }, { verified: true });
    return true;
  }
  return {
    errMsg: "Wrong OTP. Please enter correct OTP",
  };
};

const loginService = async (email, password) => {
  const checkUser = await userDaos.findUser({ email });
  if (checkUser) {
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (checkPassword) {
      const user = await userDaos.updateUser({ email }, { login: true });
      return user;
    }
    return {
      errMsg: "Wrong password",
    };
  }
  return {
    errMsg: "User not found",
  };
};

const requestChangePassService = async (email) => {
  const checkUser = await userDaos.findUser({ email });
  if (!checkUser) {
    return {
      errMsg: "User not found",
    };
  }

  const otp = genOTP();
  await sendMail(email, "OTP for change password", otp);
  await userDaos.updateUser({ email }, { otpForgotPassword: otp });
  return {
    msg: "Check your email",
  };
};

const resetPasswordService = async (email, otp) => {
  const checkUser = await userDaos.findUser({ email });
  if (!checkUser || !checkUser.otpForgotPassword) {
    return {
      errMsg: "Email or otp not found",
    };
  }

  if (checkUser.otpForgotPassword === otp) {
    const newPass = "123456";
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPass, salt);
    await userDaos.updateUser({ email }, { password: hashPassword });
    return {
      msg: `Your new password is ${newPass}`,
    };
  }
  return {
    errMsg: "Wrong OTP",
  };
};

module.exports = {
  registerService,
  verifyOTPService,
  loginService,
  requestChangePassService,
  resetPasswordService,
};
