const express = require('express');
const multer = require('./multer');
const cloudinary = require('./cloudinary');

const app = express();
app.use(express.json());

app.post(
  '/upload-single-image',
  multer.uploadSingleImage,
  multer.resizeUploadedImage,
  async (req, res) => {
    try {
      const result = await cloudinary.uploadImageInCloud(
        req.file.buffer,
        'Images'
      );

      res.status(200).json({
        status: 'success',
        url: result.url,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: 'Image upload failed! Please try again',
      });
    }
  }
);

module.exports = app;
