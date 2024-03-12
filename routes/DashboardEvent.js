const express = require('express');
const bcrypt=require('bcrypt')
//const Joi = require('joi');
const router=express.Router();
const mongoose=require('mongoose');
const {Event}=require('../model/DashboardEvent')
const { registerseller } = require("../model/registerSeller");
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../AllEventImages')
      
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix + '-' + file.originalname + ".png")
    }
  })

const uploadingevent = multer({ storage})


router.get("/",async (req,res)=>{

  const getSellerAllEventProduct=await Event.find()
  
  res.send(getSellerAllEventProduct)
})  

{/*
router.get("/:id",async (req,res)=>{

const getSellerAllEventProduct=await Event.find({shopid:req.params.id})

res.send(getSellerAllEventProduct)



})*/}


router.delete("/:id",async (req,res)=>{

  const getSellerAllEventProduct=await Event.findByIdAndDelete({_id:req.params.id})
  
  res.send("succesfully deleted")
  
  
  
  })




router.post('/', uploadingevent.array("eventproductimages"),async (req,res)=>{
console.log(req.files)
console.log(req.body)

const sellerexists=await registerseller.findById(req.body.currentsellerid)
const imageUrl=req.files.map(e=>e.filename)
if(!sellerexists){
  return ("Seller Does not Exists!")
}

const postData=new Event({
name:req.body.eventproductname,
description:req.body.eventproductdescription,
category:req.body.eventproductcategory,
tags:req.body.eventproducttags,
eventstartdate:req.body.eventstartDate,
eventfinishdate:req.body.eventfinishDate,
originalprice:req.body.eventproductoriginalprice,
discountprice:req.body.eventproductdiscountprice,
stock:req.body.eventproductstock,
shopid:req.body.currentsellerid,
shop:sellerexists,
image_Url:imageUrl
})

const result=await postData.save()
res.send(result)
console.log(result)

})
  
module.exports=router 