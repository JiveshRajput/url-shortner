import { Router } from 'express';
import { urlControllers } from '../controllers';
import { authMiddlewares } from '../middlewares';

const urlRoutes = Router();
const { verifyTokenMiddleware } = authMiddlewares;
const { getUrlController, createUrlController, updateUrlController, deleteUrlController } =
  urlControllers;

urlRoutes.route('/').post(verifyTokenMiddleware, createUrlController);

urlRoutes
  .route('/:uniqueId')
  .get(getUrlController)
  .patch(verifyTokenMiddleware, updateUrlController)
  .delete(verifyTokenMiddleware, deleteUrlController);

export default urlRoutes;
