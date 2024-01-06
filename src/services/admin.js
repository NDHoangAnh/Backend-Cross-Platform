const userDaos = require("../daos/user");
const postDaos = require("../daos/post");
const bcrypt = require("bcrypt");

const getUserService = async (condition) => {
  if (condition === "all") {
    const data = await userDaos.getListUser();
    const listUsers = data.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      login: user.login,
      role: user.role,
      verified: user.verified,
      avatar: user.avatar,
    }));
    return listUsers;
  }
  const user = await userDaos.findUser({ _id: condition });
  if (user) {
    const result = {
      _id: user._id,
      username: user.username,
      email: user.email,
      login: user.login,
      verified: user.verified,
      role: user.role,
      avatar: user.avatar,
    };
    return result;
  }
  return {
    errMsg: "Not found user",
  };
};

const deleteUserService = async (userId) => {
  const checkUser = await userDaos.findUser({ _id: userId });
  if (checkUser) {
    await userDaos.deleteUser(userId);
    return {
      msg: "Delete user successfully",
    };
  }
  return {
    errMsg: "User not found",
  };
};

const editUserService = async (data) => {
  const { id, username, password, role } = data;
  const checkUser = await userDaos.findUser({ _id: id });
  if (checkUser) {
    await userDaos.updateUser(id, username, password, role);
    return {
      msg: "Update user successfully",
    };
  }
  return {
    errMsg: "User not found",
  };
};

const changeRoleService = async (data) => {
  const { userId, role } = data;
  const checkUser = await userDaos.findUser({ _id: userId });
  if (checkUser) {
    await userDaos.updateUser({ _id: userId }, { role: role });
    return {
      msg: "Update user successfully",
    };
  }
  return {
    errMsg: "User not found",
  };
};

const changePassService = async (data) => {
  const { userId, password } = data;
  const checkUser = await userDaos.findUser({ _id: userId });
  if (checkUser) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await userDaos.updateUser({ _id: userId }, { password: hashPassword });
    return {
      msg: "Update password successfully",
    };
  }
  return {
    errMsg: "User not found",
  };
};

const getListPostService = async (data) => {
  const listPost = await postDaos.getListPost(data);
  return listPost;
};

const approvePostService = async (postId) => {
  const post = await postDaos.findPost({ _id: postId });
  if (!post) {
    return {
      errMsg: "Post not found",
    };
  }
  const editPost = await postDaos.updatePost(
    { _id: postId },
    { isApproved: true }
  );
  return editPost;
};

const declinePostService = async (postId) => {
  const checkPost = await postDaos.findPost({ _id: postId });
  if (!checkPost) {
    return {
      errMsg: "Post not found",
    };
  }
  await postDaos.deletePost(postId);
  return {
    msg: "Decline post successfully",
  };
};

const addUserService = async (data) => {};

module.exports = {
  declinePostService,
  approvePostService,
  getListPostService,
  changeRoleService,
  changePassService,
  getUserService,
  deleteUserService,
  editUserService,
  addUserService,
};
