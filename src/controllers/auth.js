const validate = require("../validation/index");
const authService = require("../services/auth");

const registerController = async (req, res) => {
  const { email, password, username } = req.body;
  const { error } = validate.validateCreateUser(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return res.json({ errMsg });
  }

  const newUser = await authService.registerService({
    email,
    password,
    username,
  });
  return res.json(newUser);
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validate.validateLogin(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return res.json({ errMsg });
  }
  const user = await authService.loginService(email, password);
  return res.json(user);
};

module.exports = { registerController, loginController };
