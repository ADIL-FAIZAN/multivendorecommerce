const express = require("express");
const bcrypt = require("bcrypt");
//const Joi = require('joi');
const router = express.Router();
const mongoose = require("mongoose");
const { Order } = require("../model/Orders");
const { Product } = require("../model/Products");


router.put("/:id", async (req, res) => {
    //console.log(req.body);
  
    const findOrder = await Order.findOne({ _id: req.params.id });
    res.send(findOrder);
  
    findOrder.status = req.body.orderStatus

    async function updateCart(qty,id){
  
        const findProduct=await Product.findOne({_id:id})
        findProduct.stock += qty,
        findProduct.sold_out -= qty
        
        await findProduct.save()
        }
        
    if(req.body.orderStatus==="Refund Success"){
        findOrder.cart.forEach(async (e)=>
        await updateCart(e.qty,e._id)
        )}

await findOrder.save()
      
  });



module.exports = router;