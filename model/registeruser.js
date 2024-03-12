const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//RegisteruserSchema
const registerUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
      addressType: {
        type: String,
      },
    },
  ],
});
registerUserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },process.env.JWT_KEY
   
  );
  return token;
};

const Registeruser = mongoose.model("Registeruser", registerUserSchema);

module.exports.registeruser = Registeruser;
