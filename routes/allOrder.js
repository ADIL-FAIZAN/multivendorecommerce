const { Order } = require("../model/Orders");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const { registeruser } = require("../model/registeruser");

router.get("/:id", async (req, res) => {



    const findUser=await registeruser.findById(req.params.id)

    if(findUser.isAdmin !== true){     
     return res.status(403).send('Access denied')
    }

  const sellerOrders = await Order.find().sort({deliveredAt:-1});
  res.send(sellerOrders);

});



module.exports = router;
