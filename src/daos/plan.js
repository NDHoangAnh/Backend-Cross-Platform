const Plan = require("../models/plan");

const findPlan = async (condition) => {
  const plan = await Plan.findOne(condition);
  return plan;
};

const updatePlan = async (condition, data) => {
  const plan = await Plan.findOneAndUpdate(condition, data, {
    new: true,
  });
  return plan;
};

const deletePlan = async (id) => {
  await Plan.findByIdAndDelete(id);
};

const addPlan = async ({
  startTime,
  endTime,
  name,
  description,
  isRepeatedByWeek,
}) => {
  const plan = await Plan.create({
    startTime,
    endTime,
    name,
    description,
    isRepeatedByWeek,
  });
  return plan;
};

module.exports = {
  findPlan,
  updatePlan,
  deletePlan,
  addPlan,
};
