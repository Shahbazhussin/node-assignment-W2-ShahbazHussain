const multer = require("multer");
const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname, '../images');

//Creating directory if already not exists
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

//checking for imageTypes
const fileFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false);
    }
  };
  

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir); 
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
});

module.exports = upload;

