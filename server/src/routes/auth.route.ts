import { Router } from 'express';
import { authControllers } from '../controllers';
import { authMiddlewares } from '../middlewares';

const authRoutes = Router();
const { verifyTokenMiddleware } = authMiddlewares;
const {
  registerUserController,
  sendOtpController,
  verifyOtpController,
  loginUserController,
  logoutUserController,
  getUserController,
  updateUserController,
  resetPasswordController,
  authenticateUserController,
} = authControllers;

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
authRoutes.route('/get-access-token').get(logoutUserController);

// Get: Get User Detail's API
// Patch: Update User Detail's API
authRoutes
  .route('/:userId')
  .get(verifyTokenMiddleware, getUserController)
  .patch(verifyTokenMiddleware, updateUserController);

// Post: Reset Password of User API
authRoutes.route('/reset-password/:userId').post(verifyTokenMiddleware, resetPasswordController);

// Post: Authenticate User API
authRoutes.route('/authenticate').post(verifyTokenMiddleware, authenticateUserController);

export default authRoutes;
