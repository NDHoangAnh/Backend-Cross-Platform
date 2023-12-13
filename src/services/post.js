const postDaos = require("../daos/post");
const userDaos = require("../daos/user");

const addPostService = async (data) => {
  const { senderId } = data;
  const sender = await userDaos.findUser({ _id: senderId });
  if (!sender) {
    throw new Error("Sender not found");
  }
  const post = await postDaos.addPost(data);
  return post;
};

const getAllPostService = async (data) => {
  const listPost = await postDaos.getListPost(data);
  return listPost;
};

const getPostService = async (data) => {
  const post = await postDaos.findPost({ _id: data });
  if (post) {
    return post;
  }
  throw new Error("Not found Post");
};

const deletePostService = async (postId) => {
  const checkPost = await postDaos.findPost({ _id: postId });
  if (!checkPost) {
    throw new Error("Not found Post");
  }
  await postDaos.deletePost(postId);
  return {
    msg: "Delete post successfully",
  };
};

const editPostService = async (data) => {
  const { postId } = data;
  const post = await postDaos.findPost({ _id: postId });
  if (!post) {
    throw new Error("Not found Post");
  }
  delete data.postId;
  const editPost = await postDaos.updatePost({ _id: postId }, data);
  return editPost;
};

const sharePostService = async (data) => {
  const { senderId, postId } = data;

  const sender = await userDaos.findUser({ _id: senderId });
  if (!sender) {
    throw new Error("Sender not found");
  }

  const post = await postDaos.findPost({ _id: postId });
  if (!post) {
    throw new Error("Not found Post");
  }

  let share = post.share;
  share += 1;
  await postDaos.updatePost({ _id: postId }, { share: share });
  const sharePost = await postDaos.addPost({
    senderId,
    name: "chia sẻ bài viết",
    content: post._id,
    isShare: true,
  });
  return sharePost;
};

const likePostService = async (data) => {
  const { postId, senderId } = data;

  const sender = await userDaos.findUser({ _id: senderId });
  if (!sender) {
    throw new Error("Sender not found");
  }

  const post = await postDaos.findPost({ _id: postId });
  if (!post) {
    throw new Error("Not found Post");
  }
  const like = post.like;
  const index = like.indexOf(senderId);
  if (index === -1) {
    like.push(senderId);
  } else {
    like.splice(index, 1);
  }
  const updatePost = await postDaos.updatePost({ _id: postId }, { like: like });
  return updatePost;
};

module.exports = {
  addPostService,
  getAllPostService,
  getPostService,
  deletePostService,
  editPostService,
  sharePostService,
  likePostService,
};
