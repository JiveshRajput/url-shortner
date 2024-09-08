import { Router } from 'express';
import { urlControllers } from '../controllers';
import { authMiddlewares } from '../middlewares';

const urlRoutes = Router();
const { verifyTokenMiddleware } = authMiddlewares;
const {
  getUrlController,
  getAllUrlController,
  createUrlController,
  updateUrlController,
  deleteUrlController,
  getUrlStatsController,
  getClickUrlController,
} = urlControllers;

urlRoutes.route('/').post(verifyTokenMiddleware, createUrlController);

urlRoutes.route('/all/:userId').get(verifyTokenMiddleware, getAllUrlController);
urlRoutes.route('/stats/:userId').get(verifyTokenMiddleware, getUrlStatsController);

urlRoutes.route('/click/:uniqueId').get(getClickUrlController);

urlRoutes
  .route('/:uniqueId')
  .get(getUrlController)
  .patch(verifyTokenMiddleware, updateUrlController)
  .delete(verifyTokenMiddleware, deleteUrlController);

export default urlRoutes;
