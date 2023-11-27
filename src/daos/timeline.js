const Timeline = require("../models/timeline");

const findTimeline = async (condition) => {
  const timeline = await Time.findOne(condition);
  return timeline;
};

const getListTimeline = async () => {
  const listTimeline = await Timeline.find({});
  return listTimeline;
};

const updateTimeline = async (condition, data) => {
  const timeline = await Timeline.findOneAndUpdate(condition, data, {
    new: true,
  });
  return timeline;
};

const deleteTimeline = async (id) => {
  await Timeline.findByIdAndDelete(id);
};

const addTimeline = async ({
  startDate,
  endDate,
  name,
  description,
  label,
}) => {
  const timeline = await Timeline.create({
    startDate,
    endDate,
    name,
    description,
    label,
  });
  return timeline;
};

module.exports = {
  findTimeline,
  getListTimeline,
  updateTimeline,
  deleteTimeline,
  addTimeline,
};
