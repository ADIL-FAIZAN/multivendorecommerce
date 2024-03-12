const express = require('express');
const bcrypt=require('bcrypt')
//const Joi = require('joi');
const router=express.Router();
const mongoose=require('mongoose');
const {Product}=require('../model/Products')
const { registerseller } = require("../model/registerSeller");
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../ShopProductsImages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix + '-' + file.originalname + ".png")
    }
  })

const uploading = multer({ storage})

router.get("/:id",async (req,res)=>{

const getSellerAllProduct=await Product.find({shopid:req.params.id})
res.send(getSellerAllProduct)

})

router.delete("/:id",async (req,res)=>{
  const deleteProduct=await Product.findByIdAndDelete(req.params.id)
  
  res.send(deleteProduct)
  
  console.log(deleteProduct)
  
  
  })
  
router.post('/', uploading.array("productimages"),async (req,res)=>{

const sellerexists=await registerseller.findById(req.body.currentsellerid)
const imageUrl=req.files.map(e=>e.filename)
if(!sellerexists){
  return ("Seller Does not Exists!")
}
const postData=new Product({
name:req.body.productname,
description:req.body.productdescription,
category:req.body.productcategory,
tags:req.body.producttags,
originalprice:req.body.productoriginalprice,
discountprice:req.body.productdiscountprice,
stock:req.body.productstock,
shopid:req.body.currentsellerid,
shop:sellerexists,
image_Url:imageUrl
})
const result=await postData.save()
res.send(result)
console.log(result)
})

  module.exports=router 