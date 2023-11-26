const validate = require("../validation/index");
const authService = require("../services/auth");

const registerController = async (req, res) => {
  const { email, password, username } = req.body;
  const { error } = validate.validateCreateUser(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return res.status(400).json({ errMsg });
  }

  const newUser = await authService.registerService({
    email,
    password,
    username,
  });
  return res.json(newUser);
};

const verifyOTPController = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
    return res.status(400).json({
      errMsg: "Please enter otp or email",
    });
  }

  const result = await authService.verifyOTPService(email, otp);
  return res.json(result);
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validate.validateLogin(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return res.status(400).json({ errMsg });
  }
  const user = await authService.loginService(email, password);
  return res.json(user);
};

const requestChangePassController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      errMsg: "Please enter your email",
    });
  }

  const result = await authService.requestChangePassService(email);
  return res.json(result);
};

const resetPasswordController = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      errMsg: "Please enter your email or otp",
    });
  }

  const result = await authService.resetPasswordService(email, otp);
  return res.json(result);
};

module.exports = {
  registerController,
  loginController,
  verifyOTPController,
  requestChangePassController,
  resetPasswordController,
};
