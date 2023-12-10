const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  type: String,
  name: String,
  content: String,
  time: Date,
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
