import { Router } from 'express';
import { homeControllers } from '../controllers';

const homeRoutes = Router();
const {appInfoController} = homeControllers;

// Get: Details
homeRoutes.route('/').get(appInfoController);

export default homeRoutes;
