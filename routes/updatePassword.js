const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const mongoose = require("mongoose");
const { registeruser } = require("../model/registeruser");
const multer = require("multer");

router.put("/", async (req, res) => {

  const salt = await bcrypt.genSalt(10);
 // const hashPassword = await bcrypt.hash(req.body.data.oldPassword,salt);

//console.log("reqbody",req.body)
  const existUser = await registeruser.findOne({ _id: req.body.data.id });
// console.log("user",existUser);

const isPasswordValid = await bcrypt.compare(req.body.data.oldPassword,existUser.password)
if(!isPasswordValid){
return res.status(400).send("your old Password does not correct")
}
if(req.body.data.newPassword!==req.body.data.confirmPassword){
return res.status(400).send("your new and confirm password are not matched!")
}
const confirmHashed= await bcrypt.hash(req.body.data.confirmPassword,salt);
existUser.password=confirmHashed
const result=await existUser.save()
console.log(result)
res.send(result)
});

module.exports = router;
