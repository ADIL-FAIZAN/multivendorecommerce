const { registerseller } = require("../model/registerSeller");
const { registeruser } = require("../model/registeruser");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

router.get("/:id", async (req, res) => {
  const findUser = await registeruser.findById(req.params.id);

  if (findUser.isAdmin !== true) {
    return res.status(403).send("Access denied");
  }

  const RegisterSeller = await registerseller.find();
  res.send(RegisterSeller);
});

router.delete("/:id", async (req, res) => {
  const deleteUser = await registerseller.findByIdAndDelete({
    _id: req.params.id,
  });

  res.send("succesfully deleted");

 
});




module.exports = router;
