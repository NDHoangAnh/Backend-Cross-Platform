const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
