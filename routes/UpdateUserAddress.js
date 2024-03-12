const express = require("express");
const bcrypt = require("bcrypt");
//const Joi = require('joi');
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../model/Products");
const { registeruser } = require("../model/registeruser");
const multer = require("multer");

router.put("/", async (req, res) => {
  //console.log(req.body);

  const existUser = await registeruser.findOne({ email: req.body.email });
  console.log(existUser);

  if (
    existUser &&
    existUser.addresses.find(
      (address) => address.addressType === req.body.addressType
    )
  ) {
    return res.status(404).send("This addressType already exists");
  }

  existUser.addresses.push(req.body);
  const result = await existUser.save();
  console.log("addaddress", result);
  res.send(result);
});

module.exports = router;
