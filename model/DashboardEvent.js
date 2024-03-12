const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")

//RegisteruserSchema
const eventSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please enter Your Product name"]
    },
    description:{
        type:String,
        required:[true,"Please enter Your Product description"]
    },
    category:{
        type:String,
        required:[true,"Please enter Your Product category"]
    },
    tags:{
        type:String,
        required:[true,"Please enter Your Product Tags"]
    },
    originalprice:{
        type:Number,
        required:[true,"Please enter Your Product original Price"]
    },
    discountprice:{
        type:Number,
        required:[true,"Please enter Your Product Discount Price"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter Your Product total stock"]
    }, 
    status:{
    
        type:String,
        default:"Running",
        required:true
    },
   shopid:{
    
        type:String,
        required:true
    },
    eventstartdate:{
    
        type:Date,
        required:true
    },
    eventfinishdate:{
    
        type:Date,
        required:true
    },
    shop:{
    
        type:Object,
        required:true
    },
    image_Url:[
              {
        type:String,
     required:[true,"upload your Event product image"]
}],
sold_out:{
type:Number,
default:0
},
 createdAt:{
    type:Date,
    default:Date.now()
}})

const Event=mongoose.model("Event",eventSchema)
module.exports.Event=Event;