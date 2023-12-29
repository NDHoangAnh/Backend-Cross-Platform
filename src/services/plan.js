const planDaos = require("../daos/plan");
const validateTime = require("../utils/validateTime");
const scheduleService = require("./schedule");

const addPlanService = async (data) => {
  const { userId, startTime, endTime } = data;
  const listTime = await scheduleService.getListTimeService(userId);
  const validate = validateTime(startTime, endTime, listTime);
  if (validate) {
    return {
      errMsg: "You have other plan in this time",
    };
  }
  const newPlan = await planDaos.addPlan(data);
  const checkSchedule = await scheduleService.checkScheduleService(userId);
  if (checkSchedule) {
    checkSchedule.plans.push(newPlan?._id);
    await checkSchedule.save();
  } else {
    await scheduleService.addScheduleService({
      userId,
      plans: [newPlan?._id],
    });
  }

  return newPlan;
};

const editPlanService = async (data) => {
  const { planId, ...otherField } = data;
  const plan = await planDaos.findPlan({ _id: planId });
  if (plan) {
    const updatedPlan = await planDaos.updatePlan({ _id: planId }, otherField);
    return updatedPlan;
  }

  return {
    errMsg: "Plan not found",
  };
};

const deletePlanService = async (planId) => {
  const plan = await planDaos.findPlan({ _id: planId });
  if (plan) {
    await planDaos.deletePlan(planId);
    return {
      msg: "Delete plan successfully",
    };
  }

  return {
    errMsg: "Plan not found",
  };
};

const getPlanDetailService = async (planId) => {
  const plan = await planDaos.findPlan({ _id: planId });
  if (plan) {
    return plan;
  }

  return {
    errMsg: "Plan not found",
  };
};

module.exports = {
  addPlanService,
  editPlanService,
  deletePlanService,
  getPlanDetailService,
};
