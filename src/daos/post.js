const Post = require("../models/post");

const findPost = async (condition) => {
  const post = await Post.findOne(condition);
  return post;
};

const getListPost = async () => {
  const listPost = await Post.find({});
  return listPost;
};

const updatePost = async (condition, data) => {
  const post = await Post.findOneAndUpdate(condition, data, { new: true });
  return post;
};

const deletePost = async (postId) => {
  await Post.findByIdAndDelete(postId);
};

const addPost = async ({ senderId, name, content }) => {
  const post = await Post.create({
    senderId,
    name,
    content,
  });
  return post;
};

module.exports = { findPost, getListPost, updatePost, deletePost, addPost };
