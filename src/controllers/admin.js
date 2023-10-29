const adminService = require("../services/admin");

const adminAddUserController = async (req, res) => {};

const adminEditUserController = async (req, res) => {};

const adminGetUserController = async (req, res) => {
  const { condition } = req.query;
  if (!condition || condition.toLowerCase() === "all") {
    const result = await adminService.getUserService("all");
    return res.json(result);
  }

  const result = await adminService.getUserService(condition);
  return res.json(result);
};

const adminDeleteUserController = async (req, res) => {
  const result = await adminService.deleteUserService(req.params.id);
  return res.json(result);
};

module.exports = {
  adminAddUserController,
  adminEditUserController,
  adminGetUserController,
  adminDeleteUserController,
};
