 
 const mongoose = require("mongoose");

 const connectDB = async () => {
    await mongoose.connect("mongodb+srv://devTinder:devTinder@clusterab.kpbyv.mongodb.net/");
 };

 module.exports = connectDB;
