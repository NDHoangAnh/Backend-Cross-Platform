const Target = require("../models/target");

const findTarget = async (condition) => {
  const target = await Target.findOne(condition);
  return target;
};

const getListTarget = async (userId) => {
  const listUser = await Target.find({ userId });
  return listUser;
};

const updateTarget = async (condition, data) => {
  const target = await Target.findOneAndUpdate(condition, data, { new: true });
  return target;
};

const deleteTarget = async (id) => {
  await Target.findByIdAndDelete(id);
};

const addTarget = async ({ name, description, targetPoint, userId }) => {
  const target = await Target.create({
    name,
    description,
    targetPoint,
    userId,
  });
  return target;
};

module.exports = {
  findTarget,
  getListTarget,
  updateTarget,
  deleteTarget,
  addTarget,
};
