const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    targetPoint: Number,
    realPoint: Number,
    status: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Target = mongoose.model("Target", targetSchema);

module.exports = Target;
