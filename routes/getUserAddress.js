const { registeruser } = require("../model/registeruser");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

router.get("/:id", async (req, res) => {
  const data = await registeruser.find({ _id: req.params.id });
  res.send(data);
  // res.send(data);
});

router.delete("/:id", async (req, res) => {
  //const findUser = await registeruser.findById(req.body.userId);

   await registeruser.updateOne(
    {
    _id:req.body.userId
   },
   
   {$pull:{addresses:{_id:req.params.id}}}
   
   )

const user=await registeruser.findById(req.body.userId)

res.send(user)
});

module.exports = router;
