const multer = require('multer');
const sharp = require('sharp');

// Store image in memory not file
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Not an image! Please upload an image', false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadSingleImage = upload.single('photo');
exports.uploadMultipleImage = upload.array('photos');

exports.resizeUploadedImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    req.file.buffer = await sharp(req.file.buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Image upload failed! Please try again',
    });
  }
};

exports.resizeMultipleImage = async (req, res, next) => {
  try {
    if (!req.files) return next();

    req.files.buffer = await Promise.all(
      req.files.map(async (file) => {
        return await sharp(file.buffer)
          .resize(200, 200)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer();
      })
    );

    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Image upload failed! Please try again',
    });
  }
};
