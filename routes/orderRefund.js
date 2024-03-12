const express = require("express");
const bcrypt = require("bcrypt");
//const Joi = require('joi');
const router = express.Router();
const mongoose = require("mongoose");
const { Order } = require("../model/Orders");
const { Product } = require("../model/Products");

router.put("/:id", async (req, res) => {
  //console.log(req.body);

  const findOrder = await Order.findOne({ _id: req.params.id });
  res.send(findOrder);

  findOrder.status = req.body.status;
  await findOrder.save();
});

module.exports = router;
