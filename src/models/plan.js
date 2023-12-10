const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    startTime: Date,
    endTime: Date,
    name: String,
    description: String,
    isClass: {
      type: Boolean,
      default: false,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Klass",
    },
    isRepeatedByWeek: Boolean,
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
