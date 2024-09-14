"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const urlRoutes = (0, express_1.Router)();
const { verifyTokenMiddleware } = middlewares_1.authMiddlewares;
const { getUrlController, getAllUrlController, createUrlController, updateUrlController, deleteUrlController, getUrlStatsController, getClickUrlController, } = controllers_1.urlControllers;
urlRoutes.route('/').post(verifyTokenMiddleware, createUrlController);
urlRoutes.route('/all/:userId').get(verifyTokenMiddleware, getAllUrlController);
urlRoutes.route('/stats/:userId').get(verifyTokenMiddleware, getUrlStatsController);
urlRoutes.route('/click/:uniqueId').get(getClickUrlController);
urlRoutes
    .route('/:uniqueId')
    .get(getUrlController)
    .patch(verifyTokenMiddleware, updateUrlController)
    .delete(verifyTokenMiddleware, deleteUrlController);
exports.default = urlRoutes;
