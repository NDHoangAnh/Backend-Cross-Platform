const scheduleDaos = require("../daos/schedule");
const userDaos = require("../daos/user");

const checkScheduleService = async (userId) => {
  const schedule = await scheduleDaos.findSchedule({ userId });
  return schedule;
};

const getDetailScheduleService = async (userId) => {
  const user = await userDaos.findUser({ _id: userId });
  if (user) {
    const schedule = await scheduleDaos.getDetailSchedule({ userId });
    if (schedule) {
      return schedule;
    }
    return { errMsg: "User dont have schedule" };
  }
  return {
    errMsg: "User not found",
  };
};

const addScheduleService = async ({ userId, plans, klass }) => {
  const newSchedule = await scheduleDaos.addSchedule({ userId, plans, klass });
  return newSchedule;
};

const getListTimeService = async (userId) => {
  const listPlan = await scheduleDaos.getDetailSchedule({ userId });
  const listTime = listPlan.plans.map((plan) => ({
    timeStart: plan?.startTime,
    timeEnd: plan?.endTime,
  }));
  return listTime;
};

module.exports = {
  checkScheduleService,
  getDetailScheduleService,
  addScheduleService,
  getListTimeService,
};
