const { registerseller } = require("../model/registerSeller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../sellerUpload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname + ".png");
  },
});
const sellerUpload = multer({ storage });

router.put("/", sellerUpload.single("shopImage"), async (req, res) => {
 const currentSeller = await registerseller.findById(req.body.id);
 //console.log(currentSeller);
  //console.log(req.file);
 //console.log("reqbody",req.body);
if(!currentSeller){
res.status(400).send("This seller is not exists")
}
currentSeller.shopimage=req.file.filename,
currentSeller.shopname=req.body.shopName,
currentSeller.phonenumber=req.body.shopPhoneNumber,
currentSeller.selleraddress=req.body.shopAddress,
currentSeller.zipcode=req.body. shopZipCode,
currentSeller.shopdescription=req.body.shopDescription

await currentSeller.save()
res.send(currentSeller)
console.log("update current seller",currentSeller)

});

router.get("/:id", async (req, res) => {
  const RegisterSeller = await registerseller.find({ _id: req.params.id });
  res.send(RegisterSeller);
});

router.post("/", sellerUpload.single("shopImage"), async (req, res) => {
  const validateRegisterSeller = await registerseller.findOne({
    shopemail: req.body.shopEmail,
  });
  if (validateRegisterSeller) {
    return res.status(400).send("This Email is already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.shopPassword, salt);

  const registerSeller = new registerseller({
    shopname: req.body.shopName,
    shopemail: req.body.shopEmail,
    phonenumber: req.body.PhoneNumber,
    selleraddress: req.body.address,
    zipcode: req.body.zipCode,
    password: hash,
    shopimage: req.file.filename,
  });

  const result = await registerSeller.save();

  res.send(result);
});

module.exports = router;
