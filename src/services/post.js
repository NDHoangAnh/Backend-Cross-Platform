const postDaos = require("../daos/post");

const addPostServices = async (condition) => {
  const post = await postDaos.addPost(condition);
  return post;
};

const getPostService = async (condition) => {
  if (condition === "all") {
    const data = await postDaos.getListPost();
    const listPosts = data.map((post) => ({
      _id: post._id,
      senderId: post.senderId,
      name: post.name,
      content: post.content,
      like: post.like,
      comment: post.comment,
      share: post.share,
    }));
    return listPosts;
  }

  const post = await postDaos.findPost({ _id: condition });
  if (post) {
    return post;
  }
  return {
    errMsg: "Not found post",
  };
};

const deletePostService = async (postId) => {
  const checkPost = await postDaos.findPost({ _id: postId });
  if (checkPost) {
    await postDaos.deletePost(postId);
    return {
      msg: "Delete post successfully",
    };
  }
  return {
    errMsg: "Post not found",
  };
};

const editPostService = async (data) => {
  const { postId } = data;
  delete data.postId;
  const editPost = await postDaos.updatePost({ _id: postId }, data);
  return editPost;
};

module.exports = {
  addPostServices,
  getPostService,
  deletePostService,
  editPostService,
};
