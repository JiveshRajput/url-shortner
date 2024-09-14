import { Router } from 'express';
import { homeControllers } from '../controllers';

const homeRoutes = Router();
const { appInfoController, submitEnquiryController } = homeControllers;

// Post: Submit equiry form
homeRoutes.route('/enquiry').post(submitEnquiryController);

// Get: Details
homeRoutes.route('/').get(appInfoController);

export default homeRoutes;
