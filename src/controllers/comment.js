const commentService = require("../services/comment");

const addCommentController = async (req, res) => {
  const postId = req.params?.id;
  const { senderId, content } = req.body;
  if (!postId || !senderId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const post = await commentService.addCommentServices({
      postId,
      senderId,
      content,
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllCommentController = async (req, res) => {
  const postId = req.params?.id;
  if (!postId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const comment = await commentService.getAllCommentServices(postId);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateCommentController = async (req, res) => {
  const commentId = req.params?.id;
  const { senderId, content } = req.body;
  if (!commentId || !senderId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const updateComment = await commentService.updateCommentServices({
      commentId,
      senderId,
      content,
    });
    return res.status(200).json(updateComment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCommentController = async (req, res) => {
  const commentId = req.params?.id;
  if (!commentId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const comment = await commentService.deleteCommentService(commentId);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const likeCommentController = async (req, res) => {
  const commentId = req.params?.id;
  const { senderId } = req.body;
  if (!commentId || !senderId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const comment = await commentService.likeCommentService({
      commentId,
      senderId,
    });
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addCommentController,
  updateCommentController,
  getAllCommentController,
  deleteCommentController,
  likeCommentController,
};
