import { Router } from 'express';
import { urlControllers } from '../controllers';

const urlRoutes = Router();
const { getUrlController, createUrlController, updateUrlController } = urlControllers;

urlRoutes.route('/').post(createUrlController);

urlRoutes.route('/:uniqueId').get(getUrlController).patch(updateUrlController);

export default urlRoutes;
