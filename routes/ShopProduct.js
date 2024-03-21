const express = require("express");
const bcrypt = require("bcrypt");
//const Joi = require('joi');
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../model/Products");
const { registerseller } = require("../model/registerSeller");
const cloudinary = require("cloudinary");

router.get("/:id", async (req, res) => {
  const getSellerAllProduct = await Product.find({ shopid: req.params.id });
  res.send(getSellerAllProduct);
});

router.delete("/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);

  res.send(deleteProduct);

  console.log(deleteProduct);
});

router.post("/", async (req, res) => {
  console.log(req.body);

  const sellerexists = await registerseller.findById(req.body._id);

  if (!sellerexists) {
    return "Seller Does not Exists!";
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  const postData = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    tags: req.body.tags,
    originalprice: req.body.originalPrice,
    discountprice: req.body.discountPrice,
    stock: req.body.stock,
    shopid: req.body._id,
    shop: sellerexists,
    images: imagesLinks,
  });
  const result = await postData.save();
  res.send(result);
  console.log("response", result);
});

module.exports = router;
