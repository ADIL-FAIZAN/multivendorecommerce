const express = require("express");
const bcrypt = require("bcrypt");
//const Joi = require('joi');
const router = express.Router();
const mongoose = require("mongoose");
const { registeruser } = require("../model/registeruser");

router.post("/", async (req, res) => {
  //console.log(req.body)

  const validateUser = await registeruser.findOne({ email: req.body.email });

  if (!validateUser) {
    return res.status(400).send("Invalid Email");
  }

  const validatePassword = await bcrypt.compare(
    req.body.password,
    validateUser.password
  );
  if (!validatePassword) {
    return res.status(400).send("Invalid Password");
  }

  const token = validateUser.generateAuthToken();
  res.send({ token, validateUser: validateUser });
  // res.send(validateUser,token)
});
module.exports = router;
