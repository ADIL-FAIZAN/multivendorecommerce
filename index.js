const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const path = require("path");
const allSeller = require("./routes/allseller");
const registeruser = require("./routes/registeruser");
const authuser = require("./routes/auth");
const registerSeller = require("./routes/registerSeller");
const ShopLogin = require("./routes/ShopLogin");
const ShopProduct = require("./routes/ShopProduct");
const Event = require("./routes/DashboardEvent");
const AllProducts = require("./routes/allProduct");
const AdminAllProducts = require("./routes/AdminAllProducts");
const UpdateProfileImg = require("./routes/profileUpdateImage");
const UpdateUserAddress = require("./routes/UpdateUserAddress");
const getUserAddress = require("./routes/getUserAddress");
const userPassword = require("./routes/updatePassword");
const createOrder = require("./routes/createOrder");
const UserOrder = require("./routes/UserOrder");
const UserReview = require("./routes/UserReview");
const orderRefund = require("./routes/orderRefund");
const refundAccept = require("./routes/refundAccept");
const sellerEvent = require("./routes/sellerEvents");
const allseller = require("./routes/allseller");
const allOrder = require("./routes/allOrder");
const allUsers = require("./routes/AllUsers");
const cloudinary = require("cloudinary");

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname,"build")));

app.use("/api/registeruser", registeruser);
app.use("/api/authuser", authuser);
app.use("/api/registerShopSeller", registerSeller);
app.use("/api/ShopLogin", ShopLogin);
app.use("/api/ShopProduct", ShopProduct);
app.use("/api/EventProduct", Event);
app.use("/api/AllProducts", AllProducts);
app.use("/api/userUpdateImage", UpdateProfileImg);
app.use("/api/updateUserAddress", UpdateUserAddress);
app.use("/api/registerduser", getUserAddress);
app.use(`/api/userUpdatePassword`, userPassword);
app.use(`/api/createOrder`, createOrder);
app.use("/api/UserOrder", UserOrder);
app.use("/api/userreview", UserReview);
app.use("/api/RefundOrder", orderRefund);
app.use("/api/accept-Refund", refundAccept);
app.use("/api/sellerEvent", sellerEvent);
app.use("/api/allseller", allseller);
app.use("/api/allOrder", allOrder);
app.use("/api/allUsers", allUsers);
app.use("/api/allSeller", allSeller);
app.use("/api/admin-allProducts", AdminAllProducts);

mongoose
  .connect(process.env.MONGO_URL)

  .then(() => console.log("Connecting with mongodb database"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

  app.get("*", (req, res)=> {
   
    res.sendFile(path.resolve(__dirname,"build","index.html"));
    });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening on port", port));
