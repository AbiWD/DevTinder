const express = require("express");
const authRouter = express.Router();

const {validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");



authRouter.post("/signup", async (req,res) => {

    //Validation of data
    // validateSignUpData (req); 
    
    const {firstName, lastName, emailId,password} = req.body;
  
    //Encrytpt the password
    const passwordHash = await bcrypt.hash(password,10);
   
  
    // Creating a new instance of the User model
  
    const user = new User({
      firstName, lastName,emailId, password: passwordHash
    });
  
    try {
      await user.save();
      res.send ("User added successfully.");
    }catch(err){
      res.status(400).send("ERROR : "+err.message);
    }  
   });
 

   authRouter.post("/login",async (req, res) =>{
    try{
      const {emailId,password} = req.body;
  
  
      const user = await User.findOne({emailId: emailId});
      if(!user){
        throw new Error("Invalid credentials");
      }
      
      const isPasswordValid = await user.validatePassword(password);
  
      if(isPasswordValid){
        // Create a JWT token
  
        const token = await user.getJWT();
  
        // Add the token to cookie and send the response  back to user
        res.cookie("token", token,{ httpOnly:true });
  
        res.send("Login Successful!!");
      }else{
        throw new Error ("Invalid credentials");
      }
  
  
    }catch(err){
      res.status(400).send("ERROR: "+ err.message); 
    }
  });


  authRouter.post("/logout", async (req,res) => {
    res.cookie("token",null, {
      expires: new Date(Date.now()),
    });

    res.send("Logout successful");
  });


module.exports = authRouter;