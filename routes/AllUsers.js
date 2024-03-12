const { Order } = require("../model/Orders");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const { registeruser } = require("../model/registeruser");

router.get("/:id", async (req, res) => {


  const findUser = await registeruser.findById(req.params.id);

  if (findUser.isAdmin !== true) {
    return res.status(403).send("Access denied");
  }

  const AllUsers = await registeruser.find();
  res.send(AllUsers);

});

router.delete("/:id", async (req, res) => {
  const deleteUser = await registeruser.findByIdAndDelete({
    _id: req.params.id,
  });

  res.send("succesfully deleted");

 
});

module.exports = router;
