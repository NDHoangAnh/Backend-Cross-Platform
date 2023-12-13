const adminService = require("../services/admin");

const adminAddUserController = async (req, res) => {};

const changeRoleController = async (req, res) => {
  const { userId, role } = req.body;
  const user = await adminService.getUserService(userId);
  if (user) {
    const result = await adminService.changeRoleService({ userId, role });
    return res.status(200).json(result);
  }
  return res.status(400).json({ errMsg: "User not found" });
};

const changePassController = async (req, res) => {
  const { userId, password } = req.body;
  const user = await adminService.getUserService(userId);
  if (user) {
    const result = await adminService.changePassService({ userId, password });
    return res.status(200).json(result);
  }
  return res.status(400).json({ errMsg: "User not found" });
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
  const { condition } = req.query;
  if (!condition || condition.toLowerCase() === "all") {
    const result = await adminService.getUserService("all");
    return res.status(200).json(result);
  }

  const result = await adminService.getUserService(condition);
  return res.status(200).json(result);
};

const adminDeleteUserController = async (req, res) => {
  const result = await adminService.deleteUserService(req.params.id);
  return res.status(200).json(result);
};

const getListPostController = async (req, res) => {
  const result = await adminService.getListPostService({ isApproved: false });
  return res.status(200).json(result);
};

const approvePostController = async (req, res) => {
  const postId = req.params.id;

  const result = await adminService.approvePostService(postId);
  return res.status(200).json(result);
};

const declinePostController = async (req, res) => {
  const postId = req.params.id;

  const result = await adminService.declinePostService(postId);
  return res.status(200).json(result);
};

module.exports = {
  declinePostController,
  approvePostController,
  getListPostController,
  changePassController,
  changeRoleController,
  adminAddUserController,
  adminEditUserController,
  adminGetUserController,
  adminDeleteUserController,
};
