const commentService = require("../services/comment");

const addCommentController = async (req, res) => {
  const { senderId, content, postId } = req.body;
  if (!postId || !senderId || !content) {
    return res.status(400).json({ errMsg: "Missing required fields" });
  }
  try {
    const comment = await commentService.addCommentServices({
      postId,
      senderId,
      content,
    });
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

const getListCommentOfPostController = async (req, res) => {
  const postId = req.params?.id;
  if (!postId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const comment = await commentService.getAllCommentServices(postId);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
  }
};

const deleteCommentController = async (req, res) => {
  const commentId = req.params?.id;
  if (!commentId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await commentService.deleteCommentService(commentId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
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
  getListCommentOfPostController,
  deleteCommentController,
  likeCommentController,
};
