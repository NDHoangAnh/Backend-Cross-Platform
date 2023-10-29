const express = require("express");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");

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

module.exports = router;
