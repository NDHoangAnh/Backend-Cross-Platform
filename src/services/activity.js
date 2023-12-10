const actitvityDaos = require("../daos/activity");
const classDaos = require("../daos/klass");

const addActivityService = async (data) => {
  const { classId, ...otherField } = data;
  const klass = await classDaos.findClass({ _id: classId });
  if (klass) {
    const newAct = await actitvityDaos.addActivity(otherField);
    klass?.activity.push(newAct._id);
    await klass.save();
    return newAct;
  }

  return {
    errMsg: "Class not found",
  };
};

const editActivityService = async (data) => {
  const { activityId, ...otherField } = data;
  const act = await actitvityDaos.findActivity({ _id: activityId });
  if (act) {
    const updateAct = await actitvityDaos.updateActivity(
      { _id: activityId },
      otherField
    );
    return updateAct;
  }

  return {
    errMsg: "Activity not found",
  };
};

const deleteActivityService = async (activityId) => {
  const act = await actitvityDaos.findActivity({ _id: activityId });
  if (act) {
    await actitvityDaos.deleteActivity(activityId);
    return {
      msg: "Delete activity successfully",
    };
  }

  return {
    errMsg: "Activity not found",
  };
};

module.exports = {
  addActivityService,
  editActivityService,
  deleteActivityService,
};
