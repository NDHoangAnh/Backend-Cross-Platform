const Schedule = require("../models/schedule");

const addSchedule = async ({ userId, plans, klass }) => {
  const schedule = await Schedule.create({ userId, plans, klass });
  return schedule;
};

const getDetailSchedule = async (condition) => {
  const schedule = await Schedule.findOne(condition)
    .populate("plans")
    .populate({ path: "klass", select: "name startTime endTime" });

  return schedule;
};

const findSchedule = async (condition) => {
  const schedule = await Schedule.findOne(condition);
  return schedule;
};

module.exports = { getDetailSchedule, findSchedule, addSchedule };
