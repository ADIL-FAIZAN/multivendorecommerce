const express = require("express");
const bcrypt = require("bcrypt");
//const Joi = require('joi');
const router = express.Router();
const mongoose = require("mongoose");
const { Order } = require("../model/Orders");
const { Product } = require("../model/Products");

router.get("/:id", async (req, res) => {
  //console.log(req.params.id);

  const userOrder = await Order.find({
    "buyerdetail.validateUser._id": req.params.id,
  });
  res.send(userOrder);
  console.log(userOrder);
});

module.exports = router;
