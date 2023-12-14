const commentDaos = require("../daos/comment");
const postDaos = require("../daos/post");
const userDaos = require("../daos/user");

// const addCommentServices = async (data) => {
//   const { postId, senderId, content } = data;

//   const sender = await userDaos.findUser({ _id: senderId });

//   if (!sender) {
//     throw new Error("Sender not found");
//   }

//   const post = await postDaos.findPost({ _id: postId });
//   if (post) {
//     const comment = await commentDaos.addComment({ senderId, content });
//     const postComment = post.comments || [];
//     postComment.push(comment._id);
//     const updatePost = await postDaos.updatePost(
//       { _id: postId },
//       { comments: postComment }
//     );
//     return updatePost;
//   } else {
//     throw new Error("Not found Post");
//   }
// };

const addCommentServices = async (data) => {
  const { postId, senderId, content } = data;

  const sender = await userDaos.findUser({ _id: senderId });
  if (!sender) {
    throw new Error("Sender not found");
  }

  const post = await postDaos.findPost({ _id: postId });
  if (!post) {
    throw new Error("Post not found");
  }

  const comment = await commentDaos.addComment({ postId, senderId, content });
  return comment;
};

const getAllCommentServices = async (postId) => {
  const post = await postDaos.findPost({ _id: postId });
  if (post) {
    throw new Error("Not found Post");
  }
  const listComments = await commentDaos.getListCommentOfPost(postId);
  return listComments;
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
  const sender = await userDaos.findUser({ _id: senderId });
  if (!sender) {
    throw new Error("Sender not found");
  }

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
