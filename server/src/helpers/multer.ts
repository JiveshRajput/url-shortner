import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { IRequest } from '../types';

// Multer instance variable
let multerInstance: multer.Multer | null = null;

export const getMulterInstance = () => {
  if (multerInstance) return multerInstance;

  // Storage setup of multer
  const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (
      request: IRequest,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void,
    ) {
      const uploadFilePath = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadFilePath)) {
        fs.mkdirSync(uploadFilePath);
      }

      cb(null, uploadFilePath);
    },
    filename: function (
      request: IRequest,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void,
    ) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  // File filter to allow only jpg and png
  const fileFilter = (
    request: IRequest,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only .jpg and .png files are allowed!'));
    }
  };

  multerInstance = multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024, files: 2 }, // Limit file size to 5MB
  });

  return multerInstance;
};
