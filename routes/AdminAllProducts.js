const { Product } = require("../model/Products");
const express=require("express")
const router=express.Router()
const multer  = require('multer')
const { registeruser } = require("../model/registeruser");





router.get("/:id",async (req,res)=>{

    
    const findUser=await registeruser.findById(req.params.id)

    if(findUser.isAdmin !== true){     
     return res.status(403).send('Access denied')
    }


const AllProduct=await Product.find().sort({createdAt:-1})

res.send(AllProduct)

})
module.exports = router;