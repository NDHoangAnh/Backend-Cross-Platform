const express = require("express");
const middleware = require("../middleware");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");
const postController = require("../controllers/post");
const commentController = require("../controllers/comment");
const targetController = require("../controllers/target");
const classController = require("../controllers/klass");
const actitvityController = require("../controllers/activity");
const planController = require("../controllers/plan");
const scheduleController = require("../controllers/schedule");

const router = express.Router();

// auth
router.post("/register", authController.registerController);
router.post("/verifyOTP", authController.verifyOTPController);
router.post("/login", authController.loginController);
router.post("/reqChangePass", authController.requestChangePassController);
router.post("/resetPass", authController.resetPasswordController);

// user
router.put(
  "/user/edit",
  middleware.authenToken,
  userController.editUserController
);
router.put(
  "/user/editPass",
  middleware.authenToken,
  userController.editPasswordController
);

// admin
router.get(
  "/admin/getUser",
  middleware.authenAdmin,
  adminController.adminGetUserController
);

router.put(
  "/admin/changePassword",
  middleware.authenAdmin,
  adminController.changePassController
);
router.put(
  "/admin/changeRole",
  middleware.authenAdmin,
  adminController.changeRoleController
);

router.delete(
  "/admin/deleteUser/:id",
  middleware.authenAdmin,
  adminController.adminDeleteUserController
);

router.get(
  "/admin/getListPost",
  middleware.authenAdmin,
  adminController.getListPostController
);

router.put(
  "/admin/approvePost/:id",
  middleware.authenAdmin,
  adminController.approvePostController
);

router.delete(
  "/admin/declinePost/:id",
  middleware.authenAdmin,
  adminController.declinePostController
);

// post
router.post(
  "/post/add",
  middleware.authenToken,
  postController.addPostController
);
router.get(
  "/post/getAllPost",
  middleware.authenToken,
  postController.getAllPostController
);

router.get(
  "/post/getPersonalPost/:id",
  middleware.authenToken,
  postController.getPersonalPostController
);

router.get(
  "/post/getPost/:id",
  middleware.authenToken,
  postController.getPostByIdController
);
router.put(
  "/post/update/:id",
  middleware.authenToken,
  postController.updatePostController
);
router.delete(
  "/post/delete/:id",
  middleware.authenToken,
  postController.deletePostController
);

// like
router.put(
  "/post/like/:id",
  middleware.authenToken,
  postController.likePostController
);

// post share
router.post(
  "/post/share",
  middleware.authenToken,
  postController.sharePostController
);

// comment
router.put(
  "/post/addComment/:id",
  middleware.authenToken,
  commentController.addCommentController
);
router.put(
  "/comment/updateComment/:id",
  middleware.authenToken,
  commentController.updateCommentController
);
router.get(
  "/comment/getCommentOnPost/:id",
  middleware.authenToken,
  commentController.getAllCommentController
);
router.delete(
  "/comment/delete/:id",
  middleware.authenToken,
  commentController.deleteCommentController
);
router.put(
  "/comment/like/:id",
  middleware.authenToken,
  commentController.likeCommentController
);

// target
router.post(
  "/target/addTarget",
  middleware.authenToken,
  targetController.addTargetController
);
router.put(
  "/target/editTarget",
  middleware.authenToken,
  targetController.updateTargetController
);
router.get(
  "/target/getListTarget",
  middleware.authenToken,
  targetController.getListTargetController
);
router.get(
  "/target/getTarget/:id",
  middleware.authenToken,
  targetController.getTargetController
);
router.delete(
  "/target/delete/:id",
  middleware.authenToken,
  targetController.deleteTargetController
);

// class
router.post(
  "/class/add",
  middleware.authenToken,
  classController.addClassController
);
router.put(
  "/class/edit",
  middleware.authenToken,
  classController.updateClassController
);
router.delete(
  "/class/delete/:id",
  middleware.authenToken,
  classController.deleteClassController
);
router.get(
  "/class/teacher/:id",
  middleware.authenToken,
  classController.getListClassTeacherController
);
router.get(
  "/class/student",
  middleware.authenToken,
  classController.getListClassStudentController
);
router.get(
  "/class/detail/:id",
  middleware.authenToken,
  classController.getDetailClassController
);
router.post(
  "/class/enroll",
  middleware.authenToken,
  classController.enrollClassController
);

// activity
router.post("/activity/add", actitvityController.addActivityController);
router.put(
  "/activity/edit",
  middleware.authenToken,
  actitvityController.editActivityController
);
router.delete(
  "/activity/delete/:id",
  middleware.authenToken,
  actitvityController.deleteActivityController
);

// plan
router.post(
  "/plan/add",
  middleware.authenToken,
  planController.addPlanController
);
router.put(
  "/plan/edit",
  middleware.authenToken,
  planController.editPlanController
);
router.delete(
  "/plan/delete/:id",
  middleware.authenToken,
  planController.deletePlanController
);
router.get("/plan/:id", planController.getPlanDetailController);

// schedule
router.get(
  "/schedule/user/:id",
  middleware.authenToken,
  scheduleController.getScheduleController
);

module.exports = router;
