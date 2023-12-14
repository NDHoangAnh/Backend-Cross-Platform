const Comment = require("../models/comment");

const findComment = async (condition) => {
  const comment = await Comment.findOne(condition);
  return comment;
};

const getListCommentOfPost = async (postId) => {
  const listComments = await Comment.find({ postId }).populate({
    path: "senderId",
    select: "username avatar",
  });
  return listComments;
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

const addComment = async ({ postId, senderId, content }) => {
  const comment = await Comment.create({
    senderId,
    content,
    postId,
  });
  return comment;
};

module.exports = {
  findComment,
  updateComment,
  deleteComment,
  addComment,
  getListCommentOfPost,
};
