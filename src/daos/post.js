const Post = require("../models/post");

const findPost = async (condition) => {
  const post = await Post.findOne(condition).populate({
    path: "senderId",
    select: "username avatar",
  });
  return post;
};

const getListPost = async (condition) => {
  const listPost = await Post.find(condition).populate({
    path: "senderId",
    select: "username avatar",
  });
  return listPost;
};

const updatePost = async (condition, data) => {
  const post = await Post.findOneAndUpdate(condition, data, { new: true });
  return post;
};

const deletePost = async (postId) => {
  await Post.findByIdAndDelete(postId);
};

const addPost = async ({ senderId, content, imageUrl }) => {
  const post = await Post.create({ senderId, content, imageUrl });
  return post;
};

module.exports = { findPost, getListPost, updatePost, deletePost, addPost };
