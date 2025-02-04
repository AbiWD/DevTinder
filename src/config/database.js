 
 const mongoose = require("mongoose");

 const connectDB = async () => {
    await mongoose.connect("mongodb+srv://devTinder:devTinderr@clusterab.kpbyv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAb");
 };

 module.exports = connectDB;
