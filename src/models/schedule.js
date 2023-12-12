const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    plans: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Plan",
    },
    klass: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Klass",
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
