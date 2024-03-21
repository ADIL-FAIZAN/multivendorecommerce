const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")

//RegisteruserSchema
const registerSellerSchema=new mongoose.Schema({

    shopname:{
        type:String,
        required:[true,"Please enter Your Shop name"]
    },
   shopemail:{
    
        type:String,
        required:[true,"please enter youir shop email address"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minLength:[6,"password should be greater than 6 character"]
    },
    role:{
        type:String,
        default:"seller"
    },
    shopimage: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    zipcode:{
        type:Number,
        required:true
    },
    shopdescription:{
        type:String,
   
    },

    selleraddress:{
    type:String,
    required:[true,"please enter your current address"]
    },
   phonenumber:{
        type:Number,
        required:true
    },
 createdAt:{

    type:Date,
    default:Date.now()

 }

})


const Registerseller=mongoose.model("Registerseller",registerSellerSchema)

module.exports.registerseller=Registerseller;