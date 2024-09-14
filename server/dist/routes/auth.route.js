"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const authRoutes = (0, express_1.Router)();
const { verifyTokenMiddleware } = middlewares_1.authMiddlewares;
const { registerUserController, sendOtpController, verifyOtpController, loginUserController, logoutUserController, getAccessTokenController, getUserController, updateUserController, resetPasswordController, authenticateUserController, resetPasswordByOtpController, sendOtpByEmailController, } = controllers_1.authControllers;
const { uploadUserProfileImageController } = controllers_1.userControllers;
const multerIntance = (0, helpers_1.getMulterInstance)();
// Post: Register User API
authRoutes.route('/register').post(registerUserController);
// Post: Send OTP to user's email API
authRoutes.route('/send-otp').post(verifyTokenMiddleware, sendOtpController);
// Post: Verify OTP API
authRoutes.route('/verify-otp').post(verifyTokenMiddleware, verifyOtpController);
// Post: Login User API
authRoutes.route('/login').post(loginUserController);
// Post: Logout User API
authRoutes.route('/logout').post(verifyTokenMiddleware, logoutUserController);
// Get: Get Access Token API
authRoutes.route('/get-access-token').post(getAccessTokenController);
// Get: Get User Detail's API
// Patch: Update User Detail's API
authRoutes
    .route('/:userId')
    .get(verifyTokenMiddleware, getUserController)
    .patch(verifyTokenMiddleware, updateUserController);
// Post: Reset Password of User API
authRoutes.route('/reset-password/:userId').post(verifyTokenMiddleware, resetPasswordController);
// Post: Upload profile pic of User API
authRoutes
    .route('/:userId/upload-pic')
    .post(multerIntance.single('image'), verifyTokenMiddleware, uploadUserProfileImageController);
// Post: Reset Password of User via OTP API
authRoutes.route('/reset-password-by-otp').post(resetPasswordByOtpController);
// Post: Authenticate User API
authRoutes.route('/authenticate').post(verifyTokenMiddleware, authenticateUserController);
// Post: Send OTP to user's email API
authRoutes.route('/send-otp-by-email').post(sendOtpByEmailController);
exports.default = authRoutes;
