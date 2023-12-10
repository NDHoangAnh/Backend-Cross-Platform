const targetDaos = require("../daos/target");
const userDaos = require("../daos/user");

const addTargetService = async (data) => {
  const { userId } = data;
  const user = await userDaos.findUser({ _id: userId });
  if (!user) {
    return {
      errMsg: "User not found",
    };
  }

  const target = await targetDaos.addTarget(data);
  return target;
};

const editTargetService = async (data) => {
  const { targetId, ...otherField } = data;

  const target = await targetDaos.findTarget({ _id: targetId });
  if (!target) {
    return {
      errMsg: "Target not found",
    };
  }

  const updatedTarget = await targetDaos.updateTarget(
    { _id: targetId },
    otherField
  );
  return updatedTarget;
};

const getListTargetService = async (userId) => {
  const user = await userDaos.findUser({
    _id: userId,
  });

  if (user) {
    const listTarget = await targetDaos.getListTarget(userId);
    return listTarget;
  }
  return {
    errMsg: "User not found",
  };
};

const getTargetService = async (id) => {
  const target = await targetDaos.findTarget({ _id: id });
  if (target) {
    return target;
  }
  return {
    errMsg: "Target not found",
  };
};

const deleteTargetService = async (id) => {
  const target = await targetDaos.findTarget({ _id: id });
  if (target) {
    await targetDaos.deleteTarget(id);
    return {
      msg: "Delete target successfully",
    };
  }
  return {
    errMsg: "Target not found",
  };
};

module.exports = {
  addTargetService,
  editTargetService,
  getListTargetService,
  getTargetService,
  deleteTargetService,
};
