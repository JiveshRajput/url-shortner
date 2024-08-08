import { Router } from 'express';
import { authControllers } from '../controllers';
import { authMiddlewares } from '../middlewares';

const authRoutes = Router();
const { verifyTokenMiddleware } = authMiddlewares;
const {
  loginUserController,
  registerUserController,
  updateUserController,
  getUserController,
  authenticateUserController,
  resetPasswordController,
  sendOtpMailController,
  verifyUserController,
} = authControllers;

// Login User API
authRoutes.route('/login').get(loginUserController);

// Register User API
authRoutes.route('/register').post(registerUserController);

// Authenticate User API
authRoutes.route('/authenticate').post(verifyTokenMiddleware, authenticateUserController);

// Reset Password of User API
authRoutes.route('/reset-password/:userId').post(verifyTokenMiddleware, resetPasswordController);

// Get User Detail's API
// Update User Detail's API
authRoutes
  .route('/:userId')
  .get(verifyTokenMiddleware, getUserController)
  .patch(verifyTokenMiddleware, updateUserController);

// Send OTP to user's email API
authRoutes.route('/send-otp').post(verifyTokenMiddleware, sendOtpMailController);

// Verify OTP API
authRoutes.route('/verify-otp').post(verifyTokenMiddleware, verifyUserController);

export default authRoutes;
