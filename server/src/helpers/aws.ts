import AWS from 'aws-sdk';
import fs from 'fs';

let s3ClientInstance: AWS.S3 | null = null;

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
export const getAwsS3Config = (
  accessKeyId: string = process.env.AWS_S3_ACCESS_KEY as string,
  secretAccessKey: string = process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  region: string = process.env.AWS_S3_REGION as string,
) => {
  if (s3ClientInstance) return s3ClientInstance;

  // Configure AWS S3
  s3ClientInstance = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region,
  });

  return s3ClientInstance;
};

/**
 * This methods reads a file from a path and upload into AWS S3.
 * @param {Express.Multer.File} file: File to upload
 * @param {string} folder: Folder to upload
 * @param {string} Bucket: Bucket name
 */
export const uploadAwsS3Object = (
  file: Express.Multer.File,
  folder: string = 'user',
  Bucket: string = process.env.AWS_S3_BUCKET_NAME as string,
) => {
  const s3Client = getAwsS3Config();

  const fileContent = fs.readFileSync(file.path);

  const params: AWS.S3.PutObjectRequest = {
    Bucket, // Bucket name
    Key: `${folder}/${file.filename}`, // File path in S#
    Body: fileContent,
    ContentType: file.mimetype,
  };

  return s3Client.upload(params).promise(); // Upload file to S3
};

/**
 * This methods deletes a file from a path and upload into AWS S3.
 * @param {string} file: File name
 * @param {string} folder: Folder to upload
 * @param {string} Bucket: Bucket name
 */
export const deleteAwsS3Object = async (
  file: string = '',
  folder: string = 'user',
  Bucket: string = process.env.AWS_S3_BUCKET_NAME as string,
) => {
  const s3Client = getAwsS3Config();

  const params: AWS.S3.PutObjectRequest = {
    Bucket, // Bucket name
    Key: `${folder}/${file}`, // File path in S#
  };
  try {
    await s3Client.deleteObject(params).promise(); // Delete file from S3
  } catch (error) {
    console.error('Error: delete user image', error);
  }
};
