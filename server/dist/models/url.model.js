"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = void 0;
const mongoose_1 = require("mongoose");
const schemas_1 = require("../schemas");
exports.UrlModel = (0, mongoose_1.model)('url', schemas_1.urlSchema, 'url');
