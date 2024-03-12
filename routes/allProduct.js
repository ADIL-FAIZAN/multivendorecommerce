const { Product } = require("../model/Products");
const express=require("express")
const router=express.Router()
const multer  = require('multer')
const { registeruser } = require("../model/registeruser");





router.get("/",async (req,res)=>{

    



const AllProduct=await Product.find().sort({createdAt:-1})

res.send(AllProduct)

})





module.exports=router