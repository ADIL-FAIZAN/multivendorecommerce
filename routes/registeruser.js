const { registeruser } = require("../model/registeruser");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const cloudinary = require("cloudinary");

router.get("/", async (req, res) => {
  const data = await registeruser.find();
  res.send(data);
});

router.post("/", async (req, res) => {
  console.log("reqbody", req.body);

  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "uploads",
  });

  const useralreadyexist = await registeruser.findOne({
    email: req.body.email,
  });
  if (useralreadyexist) {
    return res.send("user already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const data = new registeruser({
    username: req.body.name,
    email: req.body.email,
    password: hash,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  const postdata = await data.save();

  const token = postdata.generateAuthToken();
  res.header("x-auth", token).send(postdata);
});

router.put("/", async (req, res) => {
  const validateUser = await registeruser.findOne({ email: req.body.email });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  if (!validateUser) {
    res.status(400).send("This User is not exists");
  }

  (validateUser.email = req.body.email),
    (validateUser.password = hash),
    (validateUser.username = req.body.name),
    (validateUser.phoneNumber = req.body.phoneNumber);

  await validateUser.save();
  res.send(validateUser);
});

module.exports = router;
