const express = require("express");
const bcrypt = require("bcrypt");
//const Joi = require('joi');
const router = express.Router();
const mongoose = require("mongoose");
const { Order } = require("../model/Orders");
const { Product } = require("../model/Products");

router.put("/", async (req, res) => {
  //console.log(req.body.orderId);

  const currentProduct = await Product.findById(req.body.productId);
  const existReview = await currentProduct.review.forEach((e) => {
    e.userid === req.body.userid;
  
});
    //await currentProduct.rating=req.body.rating

  if (!existReview) {
    const postReview = {
      user:req.body.user,
      productid:req.body.productId,
      rating:req.body.rating,
      comment:req.body.comment,
    };
  currentProduct.review.push(postReview);  
  }
  let avg = 0;
        currentProduct.review.forEach((rev) => {
        avg += rev.rating;
      });

    currentProduct.rating = avg / currentProduct.review.length;
    await Order.findByIdAndUpdate(
        req.body.orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": req.body.productId }], new: true }
      );

    await currentProduct.save();
    res.send("success")
});

module.exports = router;
