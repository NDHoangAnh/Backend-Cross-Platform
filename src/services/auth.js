const bcrypt = require("bcrypt");
const userDaos = require("../daos/user");

const registerService = async ({ email, password, username }) => {
  const checkUser = await userDaos.findUser({ email });
  if (checkUser) {
    return {
      errMsg: "User existed",
    };
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await userDaos.addUser({ email, username, hashPassword });
  return user;
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

module.exports = { registerService, loginService };
