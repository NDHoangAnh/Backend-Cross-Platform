const planService = require("../services/plan");
const validate = require("../validation/index");

const addPlanController = async (req, res) => {
  try {
    const { error } = validate.validateAddPlan(req.body);
    if (error) {
      const errMsg = error.details[0].message;
      return res.json({ errMsg });
    }

    const result = await planService.addPlanService(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const editPlanController = async (req, res) => {
  try {
    const { error } = validate.validateEditPlan(req.body);
    if (error) {
      const errMsg = error.details[0].message;
      return res.json({ errMsg });
    }

    const result = await planService.editPlanService(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

const deletePlanController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await planService.deletePlanService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

const getPlanDetailController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await planService.getPlanDetailService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

module.exports = {
  addPlanController,
  editPlanController,
  deletePlanController,
  getPlanDetailController,
};
