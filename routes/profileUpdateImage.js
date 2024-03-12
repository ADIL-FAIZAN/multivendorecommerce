const { registeruser } = require("../model/registeruser");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../profileImage");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname + ".png");
  },
});

const upload = multer({ storage });

router.put("/", upload.single("image"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const validateUser = await registeruser.findOne({ email: req.body.email });

  validateUser.image = fileUrl;

  const upImage = await validateUser.save();
  res.send(upImage);
  console.log(upImage);
});

module.exports = router;
