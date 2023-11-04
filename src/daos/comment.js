const Comment = require("../models/comment");

const findComment = async (condition) => {
  const comment = await Comment.findOne(condition);
  return comment;
};

const updateComment = async (condition, data) => {
  const comment = await Comment.findOneAndUpdate(condition, data, {
    new: true,
  });
  return comment;
};

const deleteComment = async (commentId) => {
  await Comment.findByIdAndDelete(commentId);
};

const addComment = async ({ senderId, content }) => {
  const comment = await Comment.create({
    senderId,
    content,
  });
  return comment;
};

module.exports = {
  findComment,
  updateComment,
  deleteComment,
  addComment,
};
