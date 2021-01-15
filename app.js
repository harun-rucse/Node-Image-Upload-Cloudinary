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
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: 'Image upload failed! Please try again',
      });
    }
  }
);

app.post(
  '/upload-multiple-image',
  multer.uploadMultipleImage,
  multer.resizeMultipleImage,
  async (req, res) => {
    try {
      const result = await Promise.all(
        req.files.buffer.map(async (buffer) => {
          return await cloudinary.uploadImageInCloud(buffer, 'MultipleImages');
        })
      );

      res.status(200).json({
        status: 'success',
        total: result.length,
        data: result,
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
