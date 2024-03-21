const { registeruser } = require("../model/registeruser");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const cloudinary = require("cloudinary");

router.put("/", async (req, res) => {
  
  const validateUser = await registeruser.findOne({ email: req.body.emails });
  console.log("validateuser",validateUser);
  if (req.body.selectImage !== "") {
    const imageId = validateUser.image.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.selectImage, {
      folder: "profileImage",
    });
    validateUser.image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const upImage = await validateUser.save();
  res.send(upImage);
  console.log(upImage);
});
module.exports = router;
