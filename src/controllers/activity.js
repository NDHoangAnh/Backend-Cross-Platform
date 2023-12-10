const actitvityService = require("../services/activity");
const validate = require("../validation/index");

const addActivityController = async (req, res) => {
  try {
    const { error } = validate.validateAddActivity(req.body);
    if (error) {
      const errMsg = error.details[0].message;
      return res.json({ errMsg });
    }

    const newAct = await actitvityService.addActivityService(req.body);
    return res.json(newAct);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const editActivityController = async (req, res) => {
  try {
    const { error } = validate.validateEditActivity(req.body);
    if (error) {
      const errMsg = error.details[0].message;
      return res.json({
        errMsg,
      });
    }
    const result = await actitvityService.editActivityService(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

const deleteActivityController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await actitvityService.deleteActivityService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

module.exports = {
  addActivityController,
  editActivityController,
  deleteActivityController,
};
