const Post = require("../models/post");
const User = require("../models/user");

const findPost = async (condition) => {
  const post = await Post.findOne(condition);
  const user = await User.findOne({ _id: post.senderId });
  post._doc.senderName = user.username;
  post._doc.senderAvatar = user.avatar;
  return post;
};

const getListPost = async (data) => {
  let listPost = await Post.find(data);
  for (let i in listPost) {
    const user = await User.findOne({ _id: listPost[i].senderId });
    listPost[i]._doc.senderName = user.username;
    listPost[i]._doc.senderAvatar = user.avatar;
  }
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
