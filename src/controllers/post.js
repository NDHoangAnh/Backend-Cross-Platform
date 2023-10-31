const postService = require("../services/post");
const User = require("../models/user");
const Post = require("../models/post");

const addPostController = async (req, res) => {
  const { senderId, name, content } = req.body;
  if (!senderId || !name || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(400).json({ error: "Sender not found" });
    }
    const post = await postService.addPostServices({
      senderId,
      name,
      content,
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getAllPostController = async (req, res) => {
  try {
    const post = await postService.getPostService("all");
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getPostByIdController = async (req, res) => {
  const postId = req.query.id;
  if (!postId) {
    return res.status(400).json({ error: "PostId is missing" });
  }
  try {
    const post = await postService.getPostService(postId);
    console.log(post);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updatePostController = async (req, res) => {
  const postId = req.params?.id;
  const { name, content } = req.body;
  if (!name || !content || !postId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  try {
    const post = await postService.editPostService({ postId, name, content });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const deleteController = async (req, res) => {
  const postId = req.params?.id;
  if (!postId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const post = await postService.deletePostService(postId);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  addPostController,
  getAllPostController,
  getPostByIdController,
  updatePostController,
  deleteController,
};
