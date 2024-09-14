"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMulterInstance = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Multer instance variable
let multerInstance = null;
const getMulterInstance = () => {
    if (multerInstance)
        return multerInstance;
    // Storage setup of multer
    const storage = multer_1.default.diskStorage({
        destination: function (request, file, cb) {
            const uploadFilePath = path_1.default.join(__dirname, '../uploads');
            if (!fs_1.default.existsSync(uploadFilePath)) {
                fs_1.default.mkdirSync(uploadFilePath);
            }
            cb(null, uploadFilePath);
        },
        filename: function (request, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    });
    // File filter to allow only jpg and png
    const fileFilter = (request, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (mimeType && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error('Error: Only .jpg and .png files are allowed!'));
        }
    };
    multerInstance = (0, multer_1.default)({
        storage: storage,
        fileFilter,
        limits: { fileSize: 5 * 1024 * 1024, files: 2 }, // Limit file size to 5MB
    });
    return multerInstance;
};
exports.getMulterInstance = getMulterInstance;
