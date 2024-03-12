const express = require('express');
const bcrypt=require('bcrypt')
//const Joi = require('joi');
const router=express.Router();
const mongoose=require('mongoose');
const {Event}=require('../model/DashboardEvent')
const { registerseller } = require("../model/registerSeller");
const multer  = require('multer')


router.get("/:id",async (req,res)=>{

const getSellerAllEventProduct=await Event.find({shopid:req.params.id})

res.send(getSellerAllEventProduct)



})
  
module.exports=router 