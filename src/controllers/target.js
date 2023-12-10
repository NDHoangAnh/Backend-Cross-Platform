const targetService = require("../services/target");
const validate = require("../validation/index");

const addTargetController = async (req, res) => {
  try {
    const { error } = validate.validateAddTarget(req.body);
    if (error) {
      const errMsg = error.details[0].message;
      return res.json({ errMsg });
    }

    const newTarget = await targetService.addTargetService(req.body);
    return res.json(newTarget);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const updateTargetController = async (req, res) => {
  try {
    const { error } = validate.validateEditTarget(req.body);
    if (error) {
      const errMsg = error.details[0].message;
      return res.json(errMsg);
    }

    const result = await targetService.editTargetService(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const getListTargetController = async (req, res) => {
  try {
    const { userId } = req.query;
    const result = await targetService.getListTargetService(userId);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const getTargetController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await targetService.getTargetService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const deleteTargetController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await targetService.deleteTargetService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

module.exports = {
  addTargetController,
  updateTargetController,
  getListTargetController,
  getTargetController,
  deleteTargetController,
};
