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
} = authControllers;

// Login User API
authRoutes.route('/login').get(loginUserController);

// Register User API
authRoutes.route('/register').post(registerUserController);

// Authenticate User API
authRoutes.route('/authenticate').post(verifyTokenMiddleware, authenticateUserController);

// Authenticate User API
authRoutes.route('/reset-password').post(verifyTokenMiddleware, resetPasswordController);

// Get User Detail's API
// Update User Detail's API
authRoutes
  .route('/:userId')
  .get(verifyTokenMiddleware, getUserController)
  .patch(verifyTokenMiddleware, updateUserController);

// authRoutes.route('/send-otp').post(sendMessage);

export default authRoutes;
