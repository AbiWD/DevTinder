const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async (req,res) => {
  // Creating a new instance of the User model
  const user = new User({
    firstName: "Akshay",
    lasrName:"Saini",
    emailId:"akshaysaini@gmail.com",
    password: "akshay@123",
  });

  try {
    await user.save();
    res.send ("User added successfully.");
  }catch(err){
    res.status(400).send("Error saving the user"+err.message);
  }  
});


connectDB()
.then(() => {
  console.log("Database connection established...");
  app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
  });
})
.catch((err) =>{
  console.error("Server cannot be connected!!");
});