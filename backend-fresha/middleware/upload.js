const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("iieeee", file)
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname.replace(/\s+/g, '-').toLowerCase();
    cb(null, originalName);
  }
});

const fileFilter = (req, file, cb) => {
  console.log("inside file filter", file);
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
