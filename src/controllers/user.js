const userService = require("../services/user");
const validate = require("../validation/index");

const editUserController = async (req, res) => {
  const { error } = validate.validateEditUser(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return res.status(400).json({ errMsg });
  }

  const result = await userService.editUserService(req.body);
  return res.json(result);
};

const editPasswordController = async (req, res) => {
  const { error } = validate.validateEditPass(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return res.status(400).json({ errMsg });
  }

  const result = await userService.editPassService(req.body);
  return res.json(result);
};

module.exports = { editUserController, editPasswordController };
