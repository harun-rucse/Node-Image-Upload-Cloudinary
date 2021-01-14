const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// Upload image to the cloudinary cloud
const uploadImageInCloud = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(cloudinaryUploadStream);
  });
};
