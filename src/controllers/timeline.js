const validate = require("../validation/index");

const addTimelineController = async (req, res) => {
  const { startDate, endDate, name, description, label } = req.body;
  const { error } = validate.validateAddTimeline(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return res.json({ errMsg });
  }

  const newTimeline = await timelineService.addTimelineService({
    startDate,
    endDate,
    name,
    description,
    label,
  });
  return res.json(newTimeline);
};

module.exports = { addTimelineController };
