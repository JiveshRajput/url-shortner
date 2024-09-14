"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const homeRoutes = (0, express_1.Router)();
const { appInfoController, submitEnquiryController } = controllers_1.homeControllers;
// Post: Submit equiry form
homeRoutes.route('/enquiry').post(submitEnquiryController);
// Get: Details
homeRoutes.route('/').get(appInfoController);
exports.default = homeRoutes;
