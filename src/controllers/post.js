const postService = require("../services/post");

const addPostController = async (req, res) => {
  const { senderId, name, content } = req.body;
  if (!senderId || !name || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const post = await postService.addPostServices({
      senderId,
      name,
      content,
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllPostController = async (req, res) => {
  try {
    const post = await postService.getPostService("all");
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPostByIdController = async (req, res) => {
  const postId = req.params?.id;
  if (!postId) {
    return res.status(400).json({ error: "PostId is missing" });
  }
  try {
    const post = await postService.getPostService(postId);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updatePostController = async (req, res) => {
  const postId = req.params?.id;
  const { name, content } = req.body;
  if (!name || !content || !postId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const post = await postService.editPostService({ postId, name, content });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deletePostController = async (req, res) => {
  const postId = req.params?.id;
  if (!postId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const post = await postService.deletePostService(postId);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const sharePostController = async (req, res) => {
  const { senderId, postId } = req.body;
  if (!senderId || !postId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const post = await postService.sharePostService({ senderId, postId });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const likePostController = async (req, res) => {
  const postId = req.params?.id;
  const { senderId } = req.body;
  if (!postId || !senderId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const post = await postService.likePostService({ postId, senderId });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addPostController,
  getAllPostController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  sharePostController,
  likePostController,
};
