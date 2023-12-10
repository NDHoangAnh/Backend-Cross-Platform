const classService = require("../services/klass");
const validate = require("../validation/index");

const addClassController = async (req, res) => {
  try {
    const { error } = validate.validateAddClass(req.body);
    if (error) {
      const errMsg = error.details[0].message;
      return res.json({ errMsg });
    }

    const result = await classService.addClassService(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const updateClassController = async (req, res) => {
  try {
    const { error } = validate.validateEditClass(req.body);
    if (error) {
      const errMsg = error.details[0].message;
      return res.json({ errMsg });
    }

    const result = await classService.updateClassService(req.body);
    return res.json(result);
  } catch (error) {
    return res.jstatus(500).json({
      errMsg: error.message,
    });
  }
};

const deleteClassController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await classService.deleteClassService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const getListClassStudentController = async (req, res) => {
  try {
    const { email } = req.query;
    const result = await classService.getStudentClassService(email);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const getListClassTeacherController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await classService.getTeacherClassService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

const getDetailClassController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await classService.getDetailClassService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

module.exports = {
  addClassController,
  updateClassController,
  deleteClassController,
  getListClassStudentController,
  getListClassTeacherController,
  getDetailClassController,
};
