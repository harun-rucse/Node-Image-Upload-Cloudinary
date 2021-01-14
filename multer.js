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

exports.resizeUploadedImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const fileBuffer = await sharp(req.file.buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    req.file.buffer = fileBuffer;

    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Image upload failed! Please try again',
    });
  }
};
