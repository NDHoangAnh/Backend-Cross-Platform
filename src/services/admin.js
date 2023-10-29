const userDaos = require("../daos/user");

const getUserService = async (condition) => {
  if (condition === "all") {
    const data = await userDaos.getListUser();
    const listUsers = data.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      login: user.login,
      verified: user.verified,
    }));
    return listUsers;
  }

  const user = await userDaos.findUser({ email: condition });
  if (user) {
    const result = {
      _id: user._id,
      username: user.username,
      email: user.email,
      login: user.login,
      verified: user.verified,
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

const editUserService = async (data) => {};

const addUserService = async (data) => {};

module.exports = {
  getUserService,
  deleteUserService,
  editUserService,
  addUserService,
};
