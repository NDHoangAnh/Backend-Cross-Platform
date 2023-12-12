const mongoose = require("mongoose");

const klassSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    studentId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    code: String,
    name: String,
    startTime: Date,
    endTime: Date,
    duration: [[Date]],
    activity: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Activity",
    },
  },
  {
    timestamps: true,
  }
);

const Klass = mongoose.model("Klass", klassSchema);

module.exports = Klass;
