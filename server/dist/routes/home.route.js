"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const homeRoutes = (0, express_1.Router)();
const { appInfoController } = controllers_1.homeControllers;
// Get: Details
homeRoutes.route('/').get(appInfoController);
exports.default = homeRoutes;
