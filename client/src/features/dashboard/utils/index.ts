/**
 * This function is to check if a profile picture exceeds the specified size limit.
 *
 * @param {File} file - The file object representing the profile picture.
 * @returns {boolean} - Returns true if the file size exceeds the size limit, false otherwise.
 */
export function checkProfilePicSize(file: File) {
  const fileSize: number = file.size; // Get the file size in bytes
  const sizeLimit: number = 2 * 1024 * 1024; // Set the size limit to 2 MB (in bytes)

  return fileSize > sizeLimit; // Return true if the file size exceeds the limit, false otherwise
}
