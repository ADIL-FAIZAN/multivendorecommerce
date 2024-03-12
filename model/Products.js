const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")

//RegisteruserSchema
const productSchema=new mongoose.Schema({

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
   shopid:{
    
        type:String,
        required:true
    },
    shop:{
    
        type:Object,
        required:true
    },
    image_Url:[
              {
        type:String,
     required:[true,"upload your shop profile image"]
}],


rating:{
    type:Object
},

review:[
    {

user:{

type:Object

},
productid:{
    type:String
},
rating:{
    type:Object
},
comment:{

    type:String
}

}
],
sold_out:{

type:Number,
default:0

},
   
 createdAt:{

    type:Date,
    default:Date.now()

 }

})


const Product=mongoose.model("Product",productSchema)

module.exports.Product=Product;