const { registeruser } = require("../model/registeruser");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname + ".png");
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  const data = await registeruser.find();
  res.send(data);
});

router.post("/", upload.single("image"), async (req, res) => {
  const filename = req.file.filename;
  const fileUrl = path.join(filename);

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
    image: fileUrl,
  });
  const postdata = await data.save();

  const token = postdata.generateAuthToken();
  res.header("x-auth", token).send(postdata);
});

router.put("/", async (req, res) => {
  const validateUser =await registeruser.findOne({ email: req.body.email });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

if(!validateUser){
res.status(400).send("This User is not exists")
}

 validateUser.email=req.body.email,
 validateUser.password=hash,
 validateUser.username=req.body.name,
 validateUser.phoneNumber=req.body.phoneNumber

await validateUser.save()
res.send(validateUser)
});

module.exports = router;
