const scheduleService = require("../services/schedule");

const getScheduleController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await scheduleService.getDetailScheduleService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      errMsg: error.message,
    });
  }
};

module.exports = { getScheduleController };
