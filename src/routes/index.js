const express = require("express");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");
const postController = require("../controllers/post");

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
router.get("/post/getPost?:id", postController.getPostByIdController);
router.put("/post/update/:id", postController.updatePostController);
router.delete("/post/delete/:id", postController.deleteController);

// like

module.exports = router;
