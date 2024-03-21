const express = require("express");
const bcrypt = require("bcrypt");
//const Joi = require('joi');
const router = express.Router();
const mongoose = require("mongoose");
const { Event } = require("../model/DashboardEvent");
const { registerseller } = require("../model/registerSeller");
const multer = require("multer");
const cloudinary = require("cloudinary");

router.get("/", async (req, res) => {
  const getSellerAllEventProduct = await Event.find();

  res.send(getSellerAllEventProduct);
});

{
  /*
router.get("/:id",async (req,res)=>{

const getSellerAllEventProduct=await Event.find({shopid:req.params.id})

res.send(getSellerAllEventProduct)



})*/
}

router.delete("/:id", async (req, res) => {
  const getSellerAllEventProduct = await Event.findByIdAndDelete({
    _id: req.params.id,
  });

  res.send("succesfully deleted");
});

router.post("/", async (req, res) => {
   const sellerexists = await registerseller.findById(req.body._id);
  console.log(sellerexists)
  console.log(req.body);
  if (!sellerexists) {
  return "Seller Does not Exists!";
  }
  let images = [];

  if (typeof req.body.eventImages === "string") {
    images.push(req.body.eventImages);
  } else {
    images = req.body.eventImages;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "eventImages",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  const postData = new Event({
    name: req.body.eventproductname,
    description: req.body.eventproductdescription,
    category: req.body.eventproductcategory,
    tags: req.body.eventproducttags,
    eventstartdate: req.body.eventStartDate,
    eventfinishdate: req.body.eventFinishDate,
    originalprice: req.body.eventproductoriginalprice,
    discountprice: req.body.eventproductdiscountprice,
    stock: req.body.eventproductstock,
    shopid: req.body._id,
    shop: sellerexists,
    image_Url: imagesLinks,
  });

  const result = await postData.save();
  res.send(result);
  console.log(result);


});

module.exports = router;
