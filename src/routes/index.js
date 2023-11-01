const express = require("express");

const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");
const postController = require("../controllers/post");
const commentController = require("../controllers/comment");

const router = express.Router();

// auth
router.post("/register", authController.registerController);
router.post("/verifyOTP", authController.verifyOTPController);
router.post("/login", authController.loginController);
router.post("/reqChangePass", authController.requestChangePassController);
router.post("/resetPass", authController.resetPasswordController);

// user
router.put("/user/edit", userController.editUserController);
router.put("/user/editPass", userController.editPasswordController);

// admin
router.get("/admin/getUser", adminController.adminGetUserController);
router.delete(
  "/admin/deleteUser/:id",
  adminController.adminDeleteUserController
);

// post
router.post("/post/add", postController.addPostController);
router.get("/post/getAllPost", postController.getAllPostController);
router.get("/post/getPost/:id", postController.getPostByIdController);
router.put("/post/update/:id", postController.updatePostController);
router.delete("/post/delete/:id", postController.deletePostController);

// like
router.put("/post/like/:id", postController.likePostController);

// post share
router.post("/post/share", postController.sharePostController);

// comment
router.put("/post/addComment/:id", commentController.addCommentController);
router.put(
  "/comment/updateComment/:id",
  commentController.updateCommentController
);
router.delete("/comment/delete/:id", commentController.deleteCommentController);
router.put("/comment/like/:id", commentController.likeCommentController);

module.exports = router;
