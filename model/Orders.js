const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart:{
        type: Array,
        required: true,
    },
    shippingAddress:{
        type: Object,
        required: true,
    },
    buyerdetail:{
        type: Object,
        required: true,
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        default: "Processing",
    },
    paymentdetail:{
        type:String,
        default:"Cash on Delivery"
    },
    
    deliveredAt: {
        type: Date,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
   


});

const Order= mongoose.model("Order", orderSchema)

module.exports.Order=Order ;