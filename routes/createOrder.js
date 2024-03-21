const express = require("express");
const bcrypt = require("bcrypt");
//const Joi = require('joi');
const router = express.Router();
const mongoose = require("mongoose");
const { Order } = require("../model/Orders");
const { Product } = require("../model/Products");


router.get("/:id", async (req, res) => {
  //console.log(req.params.id)

  const sellerOrders = await Order.find({ "cart.shopid": req.params.id });
  res.send(sellerOrders);
});

router.put("/:id", async (req, res) => {
  //console.log(req.body);

  const findOrder = await Order.findOne({ _id: req.params.id });
  res.send(findOrder);  
  findOrder.status = req.body.orderStatus
  if(req.body.orderStatus==="Deliverd"){
    findOrder.deliveredAt=Date.now()
    
    }

  await findOrder.save()

  if(req.body.orderStatus==="On the way"){
findOrder.cart.forEach(async (e)=>

 await updateCart(e.qty,e._id)

)}

async function updateCart(qty,id){

const findProduct=await Product.findOne({_id:id})
findProduct.stock -= qty,
findProduct.sold_out += qty

await findProduct.save()
}



});

router.post("/", async (req, res) => {
  // console.log(req.body)

  const currentUser = req.body.currentUser;
  //console.log(req.body.cartItems)
  try {
    const { cartItems, totalPrice } = req.body;
    //   group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cartItems) {
      const shopId = item.shopid;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
        //console.log(shopItemsMap)
      }
      shopItemsMap.get(shopId).push(item);
      console.log("shopitemsmap", shopItemsMap);
    }
    // create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = new Order({
        cart: items,
        shippingAddress: req.body.orderData.shippingAddress,
        buyerdetail: currentUser,
        totalPrice: totalPrice,
      });
      const post = await order.save();
      orders.push(post);
      console.log("orders", orders);
    }
    res.status(201).send(orders);
  } catch (error) {
    return error.message, 500;
  }
});

module.exports = router;
