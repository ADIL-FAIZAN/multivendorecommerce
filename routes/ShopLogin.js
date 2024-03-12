const express = require('express');
const bcrypt=require('bcrypt')
//const Joi = require('joi');
const router=express.Router();
const mongoose=require('mongoose');
const {registerseller}=require('../model/registerSeller')


router.post('/',async (req,res)=>{

   
  const validateUser=await registerseller.findOne({shopemail:req.body.email})
  if(!validateUser){ return res.status(400).send('Invalid Email')}
  
  const validatePassword=await bcrypt.compare(req.body.password,validateUser.password)
  if(!validatePassword){ return res.status(400).send('Invalid Password')}
  
  res.send(validateUser);
  
 // res.send(validateUser,token)

  })
  module.exports=router 