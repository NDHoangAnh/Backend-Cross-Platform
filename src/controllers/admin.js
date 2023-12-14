const adminService = require("../services/admin");
const validate = require("../validation/index");

const adminAddUserController = async (req, res) => {};

const changeRoleController = async (req, res) => {
  try {
    const { error } = validate.validateAdminChangeRole(req.body);
    if (error) {
      return res.json({
        errMsg: error.details[0].message,
      });
    }
    const result = await adminService.changeRoleService(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const adminChangePassController = async (req, res) => {
  try {
    const { error } = validate.validateAdminChangePass(req.body);
    if (error) {
      const errMsg = error.details[0].message;
      return res.json({ errMsg });
    }
    const result = await adminService.changePassService(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const adminEditUserController = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;
  const result = await adminService.editUserService(
    id,
    username,
    password,
    role
  );
  return res.status(200).json(result);
};

const adminGetUserController = async (req, res) => {
  try {
    const { condition } = req.query;
    if (!condition || condition.toLowerCase() === "all") {
      const result = await adminService.getUserService("all");
      return res.status(200).json(result);
    }

    const result = await adminService.getUserService(condition);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const adminDeleteUserController = async (req, res) => {
  try {
    const result = await adminService.deleteUserService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

const getListPostController = async (req, res) => {
  const result = await adminService.getListPostService({ isApproved: false });
  return res.status(200).json(result);
};

const approvePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await adminService.approvePostService(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

const declinePostController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await adminService.declinePostService(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

module.exports = {
  declinePostController,
  approvePostController,
  getListPostController,
  adminChangePassController,
  changeRoleController,
  adminAddUserController,
  adminEditUserController,
  adminGetUserController,
  adminDeleteUserController,
};
