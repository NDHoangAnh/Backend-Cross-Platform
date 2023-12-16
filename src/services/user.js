const userDaos = require("../daos/user");
const bcrypt = require("bcrypt");

const editUserService = async (data) => {
  const { email } = data;
  delete data.email;
  const editUser = await userDaos.updateUser({ email }, data);
  return editUser;
};

const editPassService = async (data) => {
  const { email, oldPass, newPass, confirmPass } = data;
  const checkUser = await userDaos.findUser({ email });
  if (!checkUser) {
    return {
      errMsg: "User not found",
    };
  }

  const checkPass = await bcrypt.compare(oldPass, checkUser.password);
  if (checkPass) {
    if (newPass === confirmPass) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPass, salt);
      const user = await userDaos.updateUser(
        { email },
        { password: hashPassword }
      );
      return user;
    }

    return {
      errMsg: "Wrong confirm password",
    };
  }

  return {
    errMsg: "Wrong password",
  };
};

const getUserService = async (id) => {
  const user = await userDaos.findUser({ _id: id });
  if (user) {
    const { username, login, email, avatar, role, birthDate, address, phone } =
      user;
    return { username, login, email, avatar, role, birthDate, address, phone };
  }
  return {
    errMsg: "User not found",
  };
};

module.exports = { editUserService, editPassService, getUserService };
