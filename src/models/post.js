const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
    like: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    share: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
