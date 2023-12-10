const Activity = require("../models/actitvity");

const findActivity = async (condition) => {
  const actitvity = await Activity.findOne(condition);
  return actitvity;
};

const updateActivity = async (condition, data) => {
  const activity = await Activity.findOneAndUpdate(condition, data, {
    new: true,
  });
  return activity;
};

const deleteActivity = async (id) => {
  await Activity.findByIdAndDelete(id);
};

const addActivity = async ({ type, name, content, time }) => {
  const actitvity = await Activity.create({
    type,
    name,
    content,
    time,
  });
  return actitvity;
};

module.exports = {
  findActivity,
  updateActivity,
  deleteActivity,
  addActivity,
};
