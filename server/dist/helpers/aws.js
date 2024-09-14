"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAwsS3Object = exports.uploadAwsS3Object = exports.getAwsS3Config = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
let s3ClientInstance = null;
/**
 * Configures and returns an AWS S3 client instance using the provided or environment-specified
 * AWS credentials (`accessKeyId`, `secretAccessKey`, and `region`).
 *
 * @param {string} [accessKeyId=process.env.AWS_S3_ACCESS_KEY] - Optional AWS access key ID. Defaults to environment variable `AWS_S3_ACCESS_KEY`.
 * @param {string} [secretAccessKey=process.env.AWS_S3_SECRET_ACCESS_KEY] - Optional AWS secret access key. Defaults to environment variable `AWS_S3_SECRET_ACCESS_KEY`.
 * @param {string} [region=process.env.AWS_S3_REGION] - Optional AWS region. Defaults to environment variable `AWS_S3_REGION`.
 *
 * @returns {AWS.S3} - Returns the configured AWS S3 client instance.
 *
 * @description
 * - If an S3 client instance (`s3ClientInstance`) already exists, it returns that instance to avoid creating a new one.
 * - If `s3ClientInstance` does not exist, it creates and configures a new instance of AWS S3 client using the provided credentials.
 * - This function implements a singleton pattern to ensure the same instance is reused across the application, optimizing resource use.
 */
const getAwsS3Config = (accessKeyId = process.env.AWS_S3_ACCESS_KEY, secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY, region = process.env.AWS_S3_REGION) => {
    if (s3ClientInstance)
        return s3ClientInstance;
    // Configure AWS S3
    s3ClientInstance = new aws_sdk_1.default.S3({
        accessKeyId,
        secretAccessKey,
        region,
    });
    return s3ClientInstance;
};
exports.getAwsS3Config = getAwsS3Config;
/**
 * This methods reads a file from a path and upload into AWS S3.
 * @param {Express.Multer.File} file: File to upload
 * @param {string} folder: Folder to upload
 * @param {string} Bucket: Bucket name
 */
const uploadAwsS3Object = (file, folder = 'user', Bucket = process.env.AWS_S3_BUCKET_NAME) => {
    const s3Client = (0, exports.getAwsS3Config)();
    const fileContent = fs_1.default.readFileSync(file.path);
    const params = {
        Bucket, // Bucket name
        Key: `${folder}/${file.filename}`, // File path in S#
        Body: fileContent,
        ContentType: file.mimetype,
    };
    return s3Client.upload(params).promise(); // Upload file to S3
};
exports.uploadAwsS3Object = uploadAwsS3Object;
/**
 * This methods deletes a file from a path and upload into AWS S3.
 * @param {string} file: File name
 * @param {string} folder: Folder to upload
 * @param {string} Bucket: Bucket name
 */
const deleteAwsS3Object = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (file = '', folder = 'user', Bucket = process.env.AWS_S3_BUCKET_NAME) {
    const s3Client = (0, exports.getAwsS3Config)();
    const params = {
        Bucket, // Bucket name
        Key: `${folder}/${file}`, // File path in S#
    };
    try {
        yield s3Client.deleteObject(params).promise(); // Delete file from S3
    }
    catch (error) {
        console.error('Error: delete user image', error);
    }
});
exports.deleteAwsS3Object = deleteAwsS3Object;
