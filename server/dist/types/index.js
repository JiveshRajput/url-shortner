"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUserRole = exports.IStatusType = void 0;
var IStatusType;
(function (IStatusType) {
    IStatusType["OK"] = "OK";
    IStatusType["FAIL"] = "FAIL";
})(IStatusType || (exports.IStatusType = IStatusType = {}));
var IUserRole;
(function (IUserRole) {
    IUserRole["VISITOR"] = "VISITOR";
    IUserRole["USER"] = "USER";
    IUserRole["ADMIN"] = "ADMIN";
})(IUserRole || (exports.IUserRole = IUserRole = {}));
