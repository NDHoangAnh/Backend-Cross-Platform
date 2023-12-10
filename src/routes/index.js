const express = require("express");

const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");
const postController = require("../controllers/post");
const commentController = require("../controllers/comment");
const targetController = require("../controllers/target");
const classController = require("../controllers/klass");
const actitvityController = require("../controllers/activity");
const planController = require("../controllers/plan");

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
router.get(
  "/comment/getCommentOnPost/:id",
  commentController.getAllCommentController
);
router.delete("/comment/delete/:id", commentController.deleteCommentController);
router.put("/comment/like/:id", commentController.likeCommentController);

// target
router.post("/target/addTarget", targetController.addTargetController);
router.put("/target/editTarget", targetController.updateTargetController);
router.get("/target/getListTarget", targetController.getListTargetController);
router.get("/target/getTarget/:id", targetController.getTargetController);
router.delete("/target/delete/:id", targetController.deleteTargetController);

// class
router.post("/class/add", classController.addClassController);
router.put("/class/edit", classController.updateClassController);
router.delete("/class/delete/:id", classController.deleteClassController);
router.get("/class/teacher/:id", classController.getListClassTeacherController);
router.get("/class/student", classController.getListClassStudentController);
router.get("/class/detail/:id", classController.getDetailClassController);

// activity
router.post("/activity/add", actitvityController.addActivityController);
router.put("/activity/edit", actitvityController.editActivityController);
router.delete(
  "/activity/delete/:id",
  actitvityController.deleteActivityController
);

// plan
router.post("/plan/add", planController.addPlanController);
router.put("/plan/edit", planController.editPlanController);
router.delete("/plan/delete/:id", planController.deletePlanController);

module.exports = router;
