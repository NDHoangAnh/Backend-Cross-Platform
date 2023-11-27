const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
  {
    startDate: Date,
    endDate: Date,
    status: String,
    name: String,
    description: String,
    label: String,
    share: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    comment: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const Timeline = mongoose.model("Timeline", timelineSchema);

module.exports = Timeline;
