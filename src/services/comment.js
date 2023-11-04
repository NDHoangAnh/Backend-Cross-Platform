const commentDaos = require("../daos/comment");
const postDaos = require("../daos/post");
const userDaos = require("../daos/user");
// const User = require("../models/user");
// const Comment = require("../models/comment");

const addCommentServices = async (data) => {
  const { postId, senderId, content } = data;

  // const sender = await User.findById(senderId);
  const sender = await userDaos.findUser({ _id: senderId });

  if (!sender) {
    return res.status(400).json({ error: "Sender not found" });
  }

  const post = await postDaos.findPost({ _id: postId });
  if (post) {
    const comment = await commentDaos.addComment({ senderId, content });
    const postComment = post.comments || [];
    postComment.push(comment._id);
    const updatePost = await postDaos.updatePost(
      { _id: postId },
      { comments: postComment }
    );
    return updatePost;
  } else {
    throw new Error("Not found Post");
  }
};

const getAllCommentServices = async (postId) => {
  const post = await postDaos.findPost({ _id: postId });
  if (post) {
    const comments = post.comments;
    let listComments = [];
    for (let comment of comments) {
      let cmt = await commentDaos.findComment({ _id: comment });
      listComments.push(cmt);
    }
    console.log(listComments.length);
    listComments.length > 0 ? listComments.shift() : "";

    return listComments;
  } else {
    throw new Error("Not found Post");
  }
};

const likeCommentService = async (data) => {
  const { commentId, senderId } = data;
  const comment = await commentDaos.findComment({ _id: commentId });
  if (comment) {
    const like = comment.like;
    const index = like.indexOf(senderId);
    if (index === -1) {
      like.push(senderId);
    } else {
      like.splice(index, 1);
    }
    const updateComment = await commentDaos.updateComment(
      { _id: commentId },
      { like: like }
    );
    return updateComment;
  } else {
    throw new Error("Not found Comment");
  }
};

const deleteCommentService = async (commentId) => {
  const checkComment = await commentDaos.findComment({ _id: commentId });
  if (checkComment) {
    await commentDaos.deleteComment(commentId);
    return {
      msg: "Delete comment successfully",
    };
  }
  throw new Error("Not found Comment");
};

const updateCommentServices = async (data) => {
  const { commentId, senderId } = data;
  // const sender = await User.findById(senderId);
  const sender = await userDaos.findUser({ _id: senderId });
  if (!sender) {
    throw new Error("Sender not found");
  }

  // const comment = await Comment.findById(commentId);
  const comment = await commentDaos.findComment({ _id: commentId });
  if (comment.senderId != senderId) {
    throw new Error("Sender can not edit comment");
  }

  delete data.commentId;
  const editComment = await commentDaos.updateComment({ _id: commentId }, data);
  return editComment;
};

module.exports = {
  addCommentServices,
  updateCommentServices,
  getAllCommentServices,
  deleteCommentService,
  likeCommentService,
};
